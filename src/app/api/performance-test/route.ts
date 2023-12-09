import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';
import {
  filterAndFormatOptimizationOpportunities,
  getAllCoreLighthouseMetrics,
  getAllCruxMetrics,
} from './utils';
import { getToken } from 'next-auth/jwt';

export async function POST(request: NextRequest) {
  const decoded = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const { url } = await request.json();

  if (!decoded) {
    return NextResponse.redirect(new URL('/login', request.url));
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

    const finalScreenshot = lighthouse?.audits['final-screenshot'];

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
        img: finalScreenshot?.details?.data,
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
