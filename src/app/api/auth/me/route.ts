import { prisma } from '@/lib/prisma';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

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
    include: { Plan: true, planUsage: true },
  });

  const [firstName, lastName] = user.name.split(' ');

  return NextResponse.json(
    {
      ...user,
      shortName: `${firstName.charAt(0)}${lastName.charAt(0)}`,
    },
    {
      status: 200,
    },
  );
}
