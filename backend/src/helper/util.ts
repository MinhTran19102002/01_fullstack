import dayjs from 'dayjs'; // ✅ correct
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { retry } from 'rxjs';
import * as qs from 'qs';
import * as crypto from 'crypto';

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




export const createVnpayPaymentUrl = ({
  orderId,
  amount,
}: {
  orderId: string;
  amount: number;
}): string => {

  const tmnCode = process.env.VNP_TNMCODE!;
  const secretKey = process.env.VNP_SECRET_KEY!;
  let vnpUrl = process.env.VNP_URL!;
  const returnUrl = process.env.VNP_RETURN_URL!;


  if (!tmnCode || !secretKey || !vnpUrl || !returnUrl) {
    throw new Error('Thiếu cấu hình VNPAY trong biến môi trường');
  }

  const createDate = dayjs().format('YYYYMMDDHHmmss');

  let vnp_Params = {};

  vnp_Params['vnp_Version'] = '2.1.0';
  vnp_Params['vnp_Command'] = 'pay';
  vnp_Params['vnp_TmnCode'] = tmnCode;
  vnp_Params['vnp_Locale'] = 'vn';
  vnp_Params['vnp_CurrCode'] = 'VND';
  vnp_Params['vnp_TxnRef'] = orderId;
  vnp_Params['vnp_OrderInfo'] = 'Thanh toan cho ma GD:' + orderId;
  vnp_Params['vnp_OrderType'] = 'other';
  vnp_Params['vnp_Amount'] = amount * 1000;
  vnp_Params['vnp_ReturnUrl'] = returnUrl;
  vnp_Params['vnp_IpAddr'] = '127.0.0.1';
  vnp_Params['vnp_CreateDate'] = createDate;

  vnp_Params = sortObject(vnp_Params);

  let querystring = require('qs');
  let signData = querystring.stringify(vnp_Params, { encode: false });
  let crypto = require("crypto");
  let hmac = crypto.createHmac("sha512", secretKey);
  let signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");
  vnp_Params['vnp_SecureHash'] = signed;
  vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });


  return vnpUrl;
}

export const verifyVnpayReturn = (query: Record<string, any>) => {
  let vnp_Params = query;

  let secureHash = vnp_Params['vnp_SecureHash'];

  delete vnp_Params['vnp_SecureHash'];
  delete vnp_Params['vnp_SecureHashType'];

  vnp_Params = sortObject(vnp_Params);

  const tmnCode = process.env.VNP_TNMCODE!;
  const secretKey = process.env.VNP_SECRET_KEY!;

  let querystring = require('qs');
  let signData = querystring.stringify(vnp_Params, { encode: false });
  let crypto = require("crypto");
  let hmac = crypto.createHmac("sha512", secretKey);
  let signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");

  if (secureHash === signed) {
    //Kiem tra xem du lieu trong db co hop le hay khong va thong bao ket qua
    console.log(vnp_Params)
    return { code: vnp_Params['vnp_ResponseCode'] }
  } else {
    return { code: '97' }
  }
}



function sortObject(obj: Record<string, any>): Record<string, string> {
  const sorted: Record<string, string> = {};
  const keys = Object.keys(obj).sort();

  for (const key of keys) {
    const encodedKey = encodeURIComponent(key);
    const encodedValue = encodeURIComponent(obj[key]).replace(/%20/g, "+");
    sorted[encodedKey] = encodedValue;
  }

  return sorted;
}
