import { prisma } from '@/lib/prisma';
import axios from 'axios';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';
import sslChecker from 'ssl-checker';

export async function POST(request: NextRequest) {
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
      Plan: {
        select: {
          intervalMin: true,
          monitorings: true,
          quantityEmailsAllowed: true,
        },
      },
      id: true,
      email: true,
      secondary_email: true,
      terciary_email: true,
    },
  });

  const usersAmountMonitorings = await prisma.site.count({
    where: {
      userId: userInfo?.id,
    },
  });

  const monitoringsLimitByPlan = userInfo?.Plan?.monitorings ?? 5;

  if (usersAmountMonitorings + 1 > monitoringsLimitByPlan) {
    return NextResponse.json(
      {
        message: `Não foi possível criar o monitoramento. Seu plano atual não permite ${
          usersAmountMonitorings + 1
        } monitoramentos ativos.`,
      },
      { status: 403 },
    );
  }
  const userPlanInterval = userInfo?.Plan?.intervalMin ?? 5;
  const maxAllowedEmails = userInfo.Plan?.quantityEmailsAllowed ?? 1;

  const body = await request.json();

  const urlToCheckSSLInfo = body.url.replace('https://', '');
  const sslInfo = await sslChecker(urlToCheckSSLInfo);

  let pageStatus = 'up';

  try {
    await axios.get(body.url);
  } catch (error) {
    pageStatus = 'down';
  }

  await prisma.site.create({
    data: {
      name: body.name,
      url: body.url,
      checkIntervalTime: userPlanInterval,
      sslDaysRemaining: sslInfo.daysRemaining,
      sslRememberIn: 15,
      sslSendReminders: false,
      sslValidForDomains: String(sslInfo.validFor),
      sslValidFrom: sslInfo.validFrom,
      sslValidTo: sslInfo.validTo,
      userId: decoded?.id as string,
      main_email: userInfo.email,
      ...(maxAllowedEmails >= 2 && {
        secondary_email: userInfo.secondary_email,
      }),
      ...(maxAllowedEmails >= 3 && {
        terciary_email: userInfo.terciary_email,
      }),
      status: pageStatus,
    },
  });

  await prisma.subscription.update({
    where: {
      userId: userInfo?.id,
    },
    data: { monitorings: { increment: 1 } },
  });

  return NextResponse.json(
    { message: 'created ' },
    {
      status: 201,
    },
  );
}
