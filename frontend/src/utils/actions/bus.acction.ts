'use server'
import { auth } from "@/auth";
import { sendRequest } from "../api";


export async function busAll() {
  try {
    const sesion = await auth();
    const token = sesion?.user.access_token;
    const r = await sendRequest<IBackendRes<IListMeta<IBus>>>({
      method: "GET",
      url: `${process.env.NEXT_PUBLIC_BACKEND}/v1/buses`,
      token: token
    })
    return r
  } catch (error) {
    // console.log(error.message)
  }
}


export async function busDelete(_id: string) {
  try {
    // const { data: session } = useSession()
    // console.log(session)
    const sesion = await auth();
    const token = sesion?.user.access_token;
    const r = await sendRequest<IBackendRes<any>>({
      method: "DELETE",
      url: `${process.env.NEXT_PUBLIC_BACKEND}/v1/buses`,
      token: token,
      param: _id
    })
    return r
  } catch (error) {

  }
}


export async function busUpdate(bus: any) {
  try {
    // const { data: session } = useSession()
    // console.log(session)
    const sesion = await auth();
    const token = sesion?.user.access_token;
    if (bus.type === "seat") {
      bus.capacity = 45
    } else {
      bus.capacity = 40
    }
    const r = await sendRequest<IBackendRes<IListMeta<IUser>>>({
      method: "PATCH",
      url: `${process.env.NEXT_PUBLIC_BACKEND}/v1/buses`,
      token: token,
      body: {
        ...bus
      }
    })
    return r
  } catch (error) {

  }
}


export async function busAdd(bus: any) {
  try {
    const sesion = await auth();
    const token = sesion?.user.access_token;
    console.log(bus)
    if (bus.type === "seat") {
      bus.capacity = 45
    } else {
      bus.capacity = 40
    }
    console.log(bus)
    const r = await sendRequest<IBackendRes<IListMeta<IUser>>>({
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_BACKEND}/v1/buses`,
      token: token,
      body: {
        ...bus
      }
    })
    return r
  } catch (error) {

  }
}
