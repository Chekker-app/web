import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';
import {
  filterAndFormatOptimizationOpportunities,
  getAllCoreLighthouseMetrics,
  getAllCruxMetrics,
} from './utils';
import { decode } from 'next-auth/jwt';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  const { url } = await request.json();
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
          performanceTests: true,
        },
      },
      PlanUsage: {
        select: { performanceTests: true },
      },
      id: true,
    },
  });

  if (
    Number(userInfo.PlanUsage?.performanceTests) + 1 >
    Number(userInfo.Plan?.performanceTests)
  ) {
    return NextResponse.json(
      {
        message:
          'Não foi possível realizar mais testes. Seu plano atual não permite.',
      },
      { status: 403 },
    );
  }

  try {
    const { data } = await axios.get(
      `https://www.googleapis.com/pagespeedonline/v5/runPagespeed`,
      {
        params: {
          url,
          key: process.env.NEXT_APP_PAGE_SPEED_API,
        },
      },
    );

    const lighthouse = data?.lighthouseResult;

    const loadingExperienceMetrics = getAllCruxMetrics(
      data?.loadingExperience?.metrics || {},
    );
    const coreMetrics = getAllCoreLighthouseMetrics(lighthouse?.audits || {});
    const opportunities = filterAndFormatOptimizationOpportunities(
      lighthouse?.audits || {},
    );

    const performanceInfo = {
      coreMetrics,
      opportunities,
      score: lighthouse?.categories?.performance?.score * 100,
    };

    const extras = {
      pageScreenshot: {
        nodes: lighthouse?.fullPageScreenshot?.nodes,
        img: lighthouse?.fullPageScreenshot?.screenshot?.data,
        width: lighthouse?.fullPageScreenshot?.screenshot?.width,
        height: lighthouse?.fullPageScreenshot?.screenshot?.height,
      },
    };

    return NextResponse.json(
      {
        loadingExperienceMetrics,
        performanceInfo,
        extras,
      },
      {
        status: 200,
      },
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: 'Não foi realizar o teste de performance. Tente novamente.' },
      { status: 400 },
    );
  }
}
