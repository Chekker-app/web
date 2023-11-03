import { NextRequest, NextResponse } from 'next/server';
import { decode } from 'next-auth/jwt';
import { prisma } from '@/lib/prisma';

export async function PATCH(request: NextRequest) {
  const body = await request.json();
  const token = request.cookies.get('next-auth.session-token')?.value;

  const decoded = await decode({
    token: token,
    secret: process.env.NEXTAUTH_SECRET ?? '',
  });

  try {
    await prisma.user.update({
      where: { id: (decoded?.id as string) || '' },
      data: body,
    });
    return NextResponse.json({ message: 'User info updated' }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: 'error when update user info' },
      { status: 400 },
    );
  }
}
