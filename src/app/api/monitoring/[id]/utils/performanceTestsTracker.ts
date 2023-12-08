import { add, format, sub } from 'date-fns';
import { DocumentData, QuerySnapshot } from 'firebase/firestore';

export function getPerformanceTestsTrackerInfo(
  performanceInfos: QuerySnapshot<DocumentData, DocumentData>,
) {
  const dayPerformance: any = {};

  performanceInfos.forEach((doc) => {
    const log = doc.data();
    const dataLog = sub(new Date(doc.data().date.toDate()), { hours: 3 });
    const diaLog = dataLog.toISOString().split('T')[0];

    if (!dayPerformance[diaLog]) {
      dayPerformance[diaLog] = { score: 0, total: 0 };
    }

    dayPerformance[diaLog].score += Number(log.score);
    dayPerformance[diaLog].total++;
  });

  return Object.keys(dayPerformance).map((key) => {
    return {
      score: Math.floor(dayPerformance[key].score / dayPerformance[key].total),
      date: format(add(new Date(key), { hours: 3 }), 'dd LLL'),
    };
  });
}
