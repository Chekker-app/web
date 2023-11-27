// bcrypt.hashSync(myPlaintextPassword, saltRounds);
import { prisma } from '@/lib/prisma';
import { generatePassword } from '@/utils/password';
import bcrypt from 'bcrypt';
import { add } from 'date-fns';
import { NextRequest, NextResponse } from 'next/server';

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

  let user = null;

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
    }

    if (user) {
      const subscription = {
        status: 'ACTIVE',
        price: webhook.data.purchase.price.value,
        purchaseDate: creationDate,
        renewalDate,
        userId: user?.id,
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
