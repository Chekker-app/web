import { prisma } from '@/lib/prisma';
import { User } from '@prisma/client';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';
import { Key } from 'react';

function exclude(user: User, keys: Key[]): Omit<User, Key> {
  return Object.fromEntries(
    Object.entries(user).filter(([key]) => !keys.includes(key)),
  );
}

export async function GET(request: NextRequest) {
  const token = await getToken({ req: request });

  if (!token) {
    return NextResponse.json(
      { message: 'Token not provided ' },
      { status: 401 },
    );
  }

  const user = await prisma.user.findUniqueOrThrow({
    where: { id: token?.id as string },
    include: { Plan: true, Subscription: true },
  });

  const [firstName = '', lastName = ''] = user.name.split(' ');
  const userWithoutPassword = exclude(user, [
    'password',
    'avatarUrl',
    'firebaseToken',
    'subscriptionId',
    'planId',
  ]);

  return NextResponse.json(
    {
      ...userWithoutPassword,
      shortName: `${firstName?.charAt(0)}${lastName?.charAt(0)}`,
    },
    {
      status: 200,
    },
  );
}
