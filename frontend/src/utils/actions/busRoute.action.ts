'use server'
import { auth } from "@/auth";
import { sendRequest } from "../api";


export async function busRouteAll() {
  try {
    const sesion = await auth();
    const token = sesion?.user.access_token;
    const r = await sendRequest<IBackendRes<IListMeta<IBusRoute>>>({
      method: "GET",
      url: `${process.env.NEXT_PUBLIC_BACKEND}/v1/busRoutes`,
      token: token
    })
    return r
  } catch (error) {
    // console.log(error.message)
  }
}


export async function busRouteDelete(_id: string) {
  try {
    // const { data: session } = useSession()
    // console.log(session)
    const sesion = await auth();
    const token = sesion?.user.access_token;
    const r = await sendRequest<IBackendRes<any>>({
      method: "DELETE",
      url: `${process.env.NEXT_PUBLIC_BACKEND}/v1/busRoutes`,
      token: token,
      param: _id
    })
    return r
  } catch (error) {

  }
}


export async function busRouteUpdate(busRoute: any) {
  try {
    // const { data: session } = useSession()
    // console.log(session)
    const sesion = await auth();
    const token = sesion?.user.access_token;
    console.log(busRoute)
    const r = await sendRequest<IBackendRes<IBusRoute>>({
      method: "PATCH",
      url: `${process.env.NEXT_PUBLIC_BACKEND}/v1/busRoutes`,
      token: token,
      body: {
        ...busRoute
      }
    })
    return r
  } catch (error) {

  }
}


export async function busRouteAdd(bus: any) {
  try {
    const sesion = await auth();
    const token = sesion?.user.access_token;
    const r = await sendRequest<IBackendRes<IBusRoute>>({
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_BACKEND}/v1/busRoutes`,
      token: token,
      body: {
        ...bus
      }
    })
    return r
  } catch (error) {

  }
}
