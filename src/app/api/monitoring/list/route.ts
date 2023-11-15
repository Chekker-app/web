import { prisma } from '@/lib/prisma';
import { decode } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const token = request.cookies.get('next-auth.session-token')?.value;

  const decoded = await decode({
    token: token,
    secret: process.env.NEXTAUTH_SECRET ?? '',
  });

  if (!decoded) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  const sites = await prisma.site.findMany({
    where: {
      userId: decoded?.id as string,
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
