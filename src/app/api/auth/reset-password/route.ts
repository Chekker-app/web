import { transporter } from '@/lib/nodemailer';
import { prisma } from '@/lib/prisma';
import { generatePassword } from '@/utils/password';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

export async function POST(request: NextRequest) {
  const body = await request.json();

  const user = await prisma.user.findUnique({
    where: { email: body.email },
  });

  if (!user) {
    return NextResponse.json(
      { message: 'Cannot reset password' },
      { status: 400 },
    );
  }

  const newPassword = generatePassword();

  let message = `Olá, você solicitou uma redefinição de senha para a sua conta: ${body.email}.\n\n`;
  message += `Aqui está uma senha temporária para você poder acessar a plataforma e alterar a sua senha: ${newPassword}\n\n`;
  message += `Ao acessar a plataforma com a sua nova senha, siga as instruções para altera-lá:\n\n`;
  message += `Vá em Configurações\n- Senha atual: Insira a senha informada acima.\n- Nova senha: Digite a senha desejada.`;

  await transporter.sendMail({
    from: {
      name: 'MyPageUp',
      address: 'contato@convenmais.com.br',
    },
    to: body.email,
    subject: `Redefinição de senha da sua conta`,
    text: message,
  });

  const cryptedPassword = bcrypt.hashSync(newPassword, 10);

  await prisma.user.update({
    where: { id: user.id },
    data: {
      password: cryptedPassword,
    },
  });

  return NextResponse.json(
    { message: 'new password send to your email' },
    { status: 200 },
  );
}
