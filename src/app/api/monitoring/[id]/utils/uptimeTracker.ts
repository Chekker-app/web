import { add, format, sub } from 'date-fns';
import { DocumentData, QuerySnapshot } from 'firebase/firestore';

export function getUpTimeTrackerInfo(
  logs: QuerySnapshot<DocumentData, DocumentData>,
) {
  const uptimePorDia: any = {};

  logs.forEach((doc) => {
    const log = doc.data();
    const dataLog = sub(new Date(doc.data().date.toDate()), { hours: 3 });
    const diaLog = dataLog.toISOString().split('T')[0];

    if (!uptimePorDia[diaLog]) {
      uptimePorDia[diaLog] = { total: 0, up: 0 };
    }

    uptimePorDia[diaLog].total++;
    if (log.status === 'up') {
      uptimePorDia[diaLog].up++;
    }
  });

  return Object.keys(uptimePorDia).map((dia) => {
    const { total, up } = uptimePorDia[dia];
    const uptime = (up / total) * 100 || 0;

    return {
      day: format(add(new Date(dia), { hours: 3 }), 'dd/MM/yyyy'),
      uptime: `${uptime.toFixed(2)}%`,
      color: Number(uptime.toFixed(2)) < 1 ? 'rose' : 'emerald',
      tooltip: Number(uptime.toFixed(2)) < 1 ? 'Offline' : 'Online',
    };
  });
}
