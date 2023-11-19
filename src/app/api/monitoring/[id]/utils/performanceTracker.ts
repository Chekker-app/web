import { add, format, sub } from 'date-fns';
import { DocumentData, QuerySnapshot } from 'firebase/firestore';

export function getPerformanceTrackerInfo(
  logs: QuerySnapshot<DocumentData, DocumentData>,
) {
  const dayPerformance: any = {};

  logs.forEach((doc) => {
    const log = doc.data();
    const dataLog = sub(new Date(doc.data().date.toDate()), { hours: 3 });
    const diaLog = dataLog.toISOString().split('T')[0];

    if (!dayPerformance[diaLog]) {
      dayPerformance[diaLog] = { performance: 0, response: 0, total: 0 };
    }

    dayPerformance[diaLog].response += Number(log.responseTime);
    dayPerformance[diaLog].total++;
  });

  const bla = Object.keys(dayPerformance).map((key) => {
    return {
      response: (
        dayPerformance[key].response /
        dayPerformance[key].total /
        1000
      ).toFixed(2),
      date: format(add(new Date(key), { hours: 3 }), 'dd LLL'),
    };
  });

  return bla;

  // return Object.keys(dayPerformance).map((dia) => {
  //   const { total, up } = dayPerformance[dia];
  //   const uptime = (up / total) * 100 || 0;

  //   return {
  //     day: format(add(new Date(dia), { hours: 3 }), 'dd/MM/yyyy'),
  //     uptime: `${uptime.toFixed(2)}%`,
  //     color: Number(uptime.toFixed(2)) < 1 ? 'rose' : 'emerald',
  //     tooltip: Number(uptime.toFixed(2)) < 1 ? 'Offline' : 'Online',
  //   };
  // });
}
