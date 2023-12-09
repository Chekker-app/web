import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { getToken } from 'next-auth/jwt';

export async function PATCH(request: NextRequest) {
  const body = await request.json();

  const decoded = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

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
