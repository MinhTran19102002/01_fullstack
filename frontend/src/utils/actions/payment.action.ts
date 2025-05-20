'use server'
import { auth } from "@/auth";
import { sendRequest } from "../api";

export async function payment(data: any) {
  try {
    const sesion = await auth();
    const token = sesion?.user.access_token;
    const r = await sendRequest<IBackendRes<any>>({
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_BACKEND}/v1/payment/create`,
      token: token,
      body: data
    })
    return r
  } catch (error) {
    // console.log(error.message)
  }
}
