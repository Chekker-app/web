'use client';

import { TabsContent } from '@/components/ui/tabs';
import { MonitoringDetailsTabs } from './components/Tabs';
import { Header } from './components/Header';
import { SSLInfo } from './components/SSLInfo';
import { PerformanceChart } from './components/PerformanceChart';
import { UptimeTracker } from './components/UptimeTracker';
import { MainInfo } from './components/MainInfo';
import { useMonitoringDetails } from './hooks/useMonitoringDetails';
import { MonitoringDetailsSkeleton } from './components/MonitoringDetailsSkeleton';
import { HeaderSkeleton } from './components/HeaderSkeleton';
import { Configs } from './components/Configs';
import { IMonitoringDetails } from '../../types';

interface MonitoringDetailsProps {
  params: {
    monitoringId: string;
    tab: string;
  };
}

export default function Page({ params }: Readonly<MonitoringDetailsProps>) {
  const { monitoringDetails, isLoadingMonitoringDetails } =
    useMonitoringDetails({
      monitoringId: params.monitoringId,
      getMonitoring: true,
    });

  return (
    <section>
      {isLoadingMonitoringDetails ? (
        <HeaderSkeleton />
      ) : (
        <Header
          status={monitoringDetails?.status ?? null}
          name={monitoringDetails?.name ?? ''}
          url={monitoringDetails?.url ?? ''}
        />
      )}
      <div className="mt-6">
        <MonitoringDetailsTabs>
          <TabsContent
            value="overview"
            className="mt-6 grid grid-cols-[65%_auto] gap-x-5"
          >
            {isLoadingMonitoringDetails ? (
              <MonitoringDetailsSkeleton />
            ) : (
              <>
                <div className="space-y-4">
                  <MainInfo createdAt={monitoringDetails?.createdAt} />
                  <UptimeTracker data={[]} />
                  <PerformanceChart data={[]} />
                </div>
                <div>
                  <SSLInfo monitoringDetails={monitoringDetails ?? null} />
                </div>
              </>
            )}
          </TabsContent>
          {!isLoadingMonitoringDetails && (
            <TabsContent value="settings" className="mt-0">
              <Configs
                monitoringDetails={monitoringDetails as IMonitoringDetails}
              />
            </TabsContent>
          )}
        </MonitoringDetailsTabs>
      </div>
    </section>
  );
}
