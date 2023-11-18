import { getDaysInMonth } from 'date-fns';

export function getQuantityOfDaysInMonth() {
  return getDaysInMonth(new Date());
}
