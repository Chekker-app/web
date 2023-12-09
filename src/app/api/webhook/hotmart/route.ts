// bcrypt.hashSync(myPlaintextPassword, saltRounds);
import { prisma } from '@/lib/prisma';
import { generatePassword } from '@/utils/password';
import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import { add } from 'date-fns';
import { NextRequest, NextResponse } from 'next/server';
import { transporter } from '@/lib/nodemailer';

const SUBSCRIPTION_STATUS = {
  PURCHASE_CHARGEBACK: 'CHARGEBACK',
  PURCHASE_CANCELED: 'DECLINED',
  SUBSCRIPTION_CANCELLATION: 'CANCELED',
  PURCHASE_DELAYED: 'DELAYED',
};

function calculateExpirationDate(creationDate: Date) {
  return add(creationDate, { months: 1 });
}

export async function POST(request: NextRequest) {
  const webhook = await request.json();

  if (Object.keys(webhook).length === 0) {
    return NextResponse.json(
      { message: 'Webhook object cannot be empty' },
      { status: 400 },
    );
  }

  let user: User | null = null;

  user = await prisma.user.findUnique({
    where: { email: webhook.data.buyer.email },
  });

  if (webhook.event === 'PURCHASE_APPROVED') {
    const plan = await prisma.plan.findFirst({
      where: { name: webhook.data.subscription.plan.name },
    });

    const creationDate = new Date(webhook.creation_date);
    const renewalDate = calculateExpirationDate(creationDate);

    if (!user) {
      const password = generatePassword();

      const createdUser = await prisma.user.create({
        data: {
          email: webhook.data.buyer.email,
          name: webhook.data.buyer.name,
          password: bcrypt.hashSync(password, 10),
          planId: plan?.id,
          weeklyReports: false,
        },
      });

      const subscription = {
        status: 'ACTIVE',
        monitorings: 0,
        performanceTests: 0,
        usedEmails: 0,
        price: webhook.data.purchase.price.value,
        purchaseDate: creationDate,
        renewalDate,
        userId: createdUser?.id,
      };

      const createdSubscription = await prisma.subscription.create({
        data: subscription,
      });

      await prisma.user.update({
        where: { id: createdUser.id },
        data: { subscriptionId: createdSubscription.id },
      });

      let message = `Olá ${webhook.data.buyer.name}, \n\n Seja bem-vindo ao Chekker!\n\n`;
      message += `Agradecemos por se juntar a nós para monitorar suas páginas de destino de forma eficaz e simplificada. Com o Upcat, você terá acesso a monitoramento preciso, alertas instantâneos sobre a disponibilidade das suas páginas e melhorias significativas no desempenho do seu site.\n\n`;
      message += `Aqui estão suas credenciais de acesso:\n\n`;
      message += `- Link de Acesso: https://app.chekker.com.br\n`;
      message += `- E-mail: ${webhook.data.buyer.email}\n`;
      message += `- Senha: ${password}\n`;
      message += `Comece agora mesmo a aproveitar todos os benefícios que o Upcat tem a oferecer para otimizar a performance do seu site!\n\n`;
      message += `Se tiver alguma dúvida ou precisar de assistência, estamos sempre aqui para ajudar.\n\n`;
      message += `Obrigado por fazer parte da nossa comunidade!\n\n`;
      message += `Atenciosamente,\nEquipe Chekker`;

      await transporter.sendMail({
        from: {
          name: 'Chekker',
          address: 'contato@chekker.com.br',
        },
        to: webhook.data.buyer.email,
        subject: `Seja bem-vindo ao Chekker`,
        text: message,
      });
    }

    if (user) {
      const subscription = {
        status: 'ACTIVE',
        price: webhook.data.purchase.price.value,
        purchaseDate: creationDate,
        renewalDate,
        userId: user?.id,
        performanceTests: 0,
      };

      await prisma.subscription.update({
        where: { userId: user?.id },
        data: subscription,
      });

      await prisma.user.update({
        where: { id: user?.id },
        data: {
          planId: plan?.id,
        },
      });
    }
  }

  if (
    webhook.event === 'PURCHASE_CHARGEBACK' ||
    webhook.event === 'PURCHASE_CANCELED' ||
    webhook.event === 'SUBSCRIPTION_CANCELLATION' ||
    webhook.event === 'PURCHASE_DELAYED'
  ) {
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 400 });
    }

    const subscription = {
      status:
        SUBSCRIPTION_STATUS[webhook.event as keyof typeof SUBSCRIPTION_STATUS],
    };

    await prisma.subscription.update({
      where: { userId: user.id },
      data: subscription,
    });
  }

  return NextResponse.json({ message: 'successfull' }, { status: 200 });
}
