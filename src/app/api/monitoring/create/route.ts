import { prisma } from '@/lib/prisma';
import { decode } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';
import sslChecker from 'ssl-checker';

export async function POST(request: NextRequest) {
  const token = request.cookies.get('next-auth.session-token')?.value;

  const decoded = await decode({
    token: token,
    secret: process.env.NEXTAUTH_SECRET ?? '',
  });

  const body = await request.json();

  const urlToCheckSSLInfo = body.url.replace('https://', '');
  const sslInfo = await sslChecker(urlToCheckSSLInfo);

  await prisma.site.create({
    data: {
      name: body.name,
      url: body.url,
      checkIntervalTime: 3, // de acordo com o plano
      sslDaysRemaining: sslInfo.daysRemaining,
      sslRememberIn: 0,
      sslSendReminders: false,
      sslValidForDomains: String(sslInfo.validFor),
      sslValidFrom: sslInfo.validFrom,
      sslValidTo: sslInfo.validTo,
      userId: decoded?.id as any,
      status: 'up', // buscar status da página antes
    },
  });

  return NextResponse.json(sslInfo, {
    status: 201,
  });
}
