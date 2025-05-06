import dayjs from 'dayjs'; // ✅ correct
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { retry } from 'rxjs';

dayjs.extend(utc);
dayjs.extend(timezone);

// dayjs.extend(utc);
// dayjs.extend(timezone);
const bcrypt = require('bcrypt');
const saltRounds = 10;
export const hashPasswordHelper = async (plainPassword: string) => {
  try {
    return await bcrypt.hash(plainPassword, saltRounds)
  } catch (error) {
    console.log(error)
  }
}


export const comparePasswordHelper = async (plainPassword: string, hashPassword: string) => {
  try {
    return await bcrypt.compare(plainPassword, hashPassword)
  } catch (error) {
    console.log(error)
  }
}

export function toVietnamTimeDate(date: Date) {
  const updatedDate = dayjs(date).tz("Asia/Ho_Chi_Minh")

  // return dayjs(date).tz('Asia/Ho_Chi_Minh').toDate();

  return updatedDate
}
