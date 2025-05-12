import dayjs from 'dayjs'; // ✅ correct
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);
export function formatDateToVN(date: Date) {

  return dayjs(date).tz('Asia/Ho_Chi_Minh').format('HH:mm DD/MM/YYYY');
}



export function formatHourToVN(date: Date) {

  return dayjs(date).tz('Asia/Ho_Chi_Minh').format('HH:mm');
}

export function formatDayToVN(date: Date) {

  return dayjs(date).tz('Asia/Ho_Chi_Minh').format('DD/MM/YYYY');
}