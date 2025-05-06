import dayjs from 'dayjs'; // ✅ correct
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);
export function toVietnamTimeDate(date: Date) {

  return dayjs(date).tz('Asia/Ho_Chi_Minh').format('YYYY-MM-DD HH:mm:ss');
}
