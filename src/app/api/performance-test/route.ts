import axios from 'axios';
import { NextResponse } from 'next/server';
import {
  filterAndFormatOptimizationOpportunities,
  getAllCoreLighthouseMetrics,
  getAllCruxMetrics,
} from './utils';

export async function POST(request: Request) {
  const { url } = await request.json();

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
    console.log('error aqui', error);
  }
}
