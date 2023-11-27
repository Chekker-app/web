import { prisma } from '@/lib/prisma';
import { add, format, sub } from 'date-fns';
import { decode } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../../../lib/firebase';
import { getUpTimeTrackerInfo } from '@/app/api/monitoring/[id]/utils/uptimeTracker';
import { getPerformanceTrackerInfo } from './utils/performanceTracker';

interface ParamsProps {
  params: {
    id: string;
  };
}

export async function GET(_: Request, { params }: ParamsProps) {
  const site = await prisma.site.findUniqueOrThrow({
    where: {
      id: params.id,
    },
  });

  const logsCollection = collection(db, 'logs');
  const dataInicial = new Date();
  dataInicial.setDate(dataInicial.getDate() - 30);

  const q = query(
    logsCollection,
    where('siteId', '==', params.id),
    where('date', '>=', dataInicial),
  );

  const logsInMonth = await getDocs(q);

  const amountOfLogsInMonth = logsInMonth.size;
  const totalUp = logsInMonth.docs.filter(
    (doc) => doc.data().status === 'up',
  ).length;

  const monitoringUpTime = Math.min(
    100,
    (totalUp ?? 0 / amountOfLogsInMonth ?? 0) * 100,
  ).toFixed(2);

  const logsData = logsInMonth.docs.map((doc) => ({
    responseTime: Number(doc.data().responseTime),
    status: doc.data().status,
    date: sub(new Date(doc.data().date.toDate()), { hours: 3 }),
  }));

  const totalResponseTime =
    logsData.length > 0
      ? logsData.reduce((acc, current) => (acc += current.responseTime), 0)
      : 0;

  const averageResponseTime =
    logsData.length > 0
      ? (totalResponseTime / logsData.length ?? 0 / 1000).toFixed(2)
      : 0;

  const upTimeTrackerInfo = getUpTimeTrackerInfo(logsInMonth);
  const performanceTrackerInfo = getPerformanceTrackerInfo(logsInMonth);

  return NextResponse.json({
    ...site,
    sslValidTo: format(
      add(new Date(site.sslValidTo), { hours: 3 }),
      'dd/MM/yyyy HH:mm:ss',
    ),
    sslValidFrom: format(
      add(new Date(site.sslValidFrom), { hours: 3 }),
      'dd/MM/yyyy HH:mm:ss',
    ),
    sslDaysRemaining: site.sslDaysRemaining,
    createdAt: format(new Date(site.createdAt), 'dd/MM/yyyy HH:mm:ss'),
    averageResponseTime,
    monitoringUpTime,
    upTimeTrackerInfo,
    performanceTrackerInfo,
  });
}

export async function PATCH(request: NextRequest, { params }: ParamsProps) {
  const body = await request.json();
  const token = request.cookies.get('next-auth.session-token')?.value;

  const decoded = await decode({
    token: token,
    secret: process.env.NEXTAUTH_SECRET ?? '',
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
          quantityEmailsAllowed: true,
        },
      },
    },
  });

  const userPlanInterval = userInfo?.Plan?.intervalMin ?? 5;
  const userPlanEmailsLimit = userInfo?.Plan?.quantityEmailsAllowed ?? 1;

  if (body.checkIntervalTime && userPlanInterval > body.checkIntervalTime) {
    return NextResponse.json(
      {
        message:
          'Não foi possível atualizar informação. Seu plano atual não permite.',
      },
      { status: 403 },
    );
  }

  if (body.secondary_email && userPlanEmailsLimit < 2) {
    return NextResponse.json(
      {
        message:
          'Não foi possível atualizar informação. Seu plano atual não permite.',
      },
      { status: 403 },
    );
  }

  if (body.terciary_email && userPlanEmailsLimit < 3) {
    return NextResponse.json(
      {
        message:
          'Não foi possível atualizar informação. Seu plano atual não permite.',
      },
      { status: 403 },
    );
  }

  try {
    await prisma.site.update({
      where: {
        id: params.id,
      },
      data: body,
    });
    return NextResponse.json({ message: 'infos updated' });
  } catch (error) {
    return NextResponse.json(
      { message: 'Não foi possível atualizar a informação. Tente novamente.' },
      { status: 400 },
    );
  }
}

export async function DELETE(_: Request, { params }: ParamsProps) {
  try {
    await prisma.site.delete({
      where: {
        id: params.id,
      },
    });
    return NextResponse.json({ message: 'site deleted' });
  } catch (error) {
    return NextResponse.json(
      { message: 'Não foi possível excluir o monitoramento. Tente novamente.' },
      { status: 400 },
    );
  }
}
