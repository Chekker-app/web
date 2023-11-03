import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  const fixedId = 'ee7a3054-8e14-4940-a23e-7701bfe1cecd';

  const sites = await prisma.site.findMany({
    where: {
      userId: fixedId,
    },
    select: {
      id: true,
      name: true,
      url: true,
      sslDaysRemaining: true,
      status: true,
    },
  });

  return NextResponse.json(sites, {
    status: 200,
  });
}
