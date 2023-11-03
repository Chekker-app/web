// import { prisma } from '@/lib/prisma';
import { prisma } from '@/lib/prisma';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const token = await getToken({ req: request });

  const user = await prisma.user.findUniqueOrThrow({
    where: { id: token?.id as any },
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
