import { prisma } from '@/lib/prisma';
import { decode } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

export async function PATCH(request: NextRequest) {
  const body = await request.json();
  console.log('COOOOKIES', request.cookies.get('next-auth.session-token'));
  console.log('COOOOKIES ALL', request.cookies.getAll());
  const token = request.cookies.get('next-auth.session-token')?.value;

  console.log('TOKEN', token);

  const decoded = await decode({
    token: token,
    secret: process.env.NEXTAUTH_SECRET ?? '',
  });

  console.log('DECODED', decoded);

  if (!decoded) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  const userInfo = await prisma.user.findUniqueOrThrow({
    where: { id: (decoded?.id as string) || '' },
    select: {
      password: true,
    },
  });

  const isSamePassword = bcrypt.compareSync(
    body.current_password,
    userInfo.password ?? '',
  );

  if (!isSamePassword) {
    return NextResponse.json(
      {
        message: 'Senha atual informada não corresponde a senha salva',
      },
      { status: 403 },
    );
  }

  await prisma.user.update({
    where: { id: (decoded?.id as string) || '' },
    data: {
      password: bcrypt.hashSync(body.new_password, 10),
    },
  });

  return NextResponse.json({ message: 'password updated' }, { status: 200 });
}
