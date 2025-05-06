'use server'
import { auth } from "@/auth";
import { sendRequest } from "../api";



export async function getDataTrip() {
  try {
    const sesion = await auth();
    const token = sesion?.user.access_token;
    const r = await sendRequest<IBackendRes<any>>({
      method: "GET",
      url: `${process.env.NEXT_PUBLIC_BACKEND}/v1/trips/data`,
      token: token
    })
    return r
  } catch (error) {
    // console.log(error.message)
  }
}
export async function tripAdd(trip: any) {
  try {
    const sesion = await auth();
    const token = sesion?.user.access_token;
    console.log(trip)
    const r = await sendRequest<IBackendRes<IListMeta<IUser>>>({
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_BACKEND}/v1/trips`,
      token: token,
      body: {
        ...trip
      }
    })
    return r
  } catch (error) {

  }
}

export async function tripAll() {
  try {
    const sesion = await auth();
    const token = sesion?.user.access_token;
    const r = await sendRequest<IBackendRes<IListMeta<ITrip>>>({
      method: "GET",
      url: `${process.env.NEXT_PUBLIC_BACKEND}/v1/trips`,
      token: token
    })
    return r
  } catch (error) {
    // console.log(error.message)
  }
}





export async function tripDelete(_id: string) {
  try {
    // const { data: session } = useSession()
    // console.log(session)
    const sesion = await auth();
    const token = sesion?.user.access_token;
    const r = await sendRequest<IBackendRes<any>>({
      method: "DELETE",
      url: `${process.env.NEXT_PUBLIC_BACKEND}/v1/trips`,
      token: token,
      param: _id
    })
    return r
  } catch (error) {

  }
}


export async function getSeat() {
  try {
    // const { data: session } = useSession()
    // console.log(session)

    const data: any[] = [
      { position: "A01", status: "available" },
      { position: "B01", status: "occupied" },
      { position: "A02", status: "available" },
      { position: "B02", status: "available" },
      { position: "A03", status: "available" },
      { position: "B03", status: "available" },
      { position: "A04", status: "available" },
      { position: "B04", status: "available" },
      { position: "A05", status: "occupied" },
      { position: "B05", status: "occupied" },
      { position: "A06", status: "available" },
      { position: "B06", status: "available" },
      { position: "A07", status: "available" },
      { position: "B07", status: "available" },
      { position: "A08", status: "available" },
      { position: "B08", status: "available" },
      { position: "A09", status: "occupied" },
      { position: "B09", status: "available" },
      { position: "A10", status: "available" },
      { position: "B10", status: "available" },
      { position: "A11", status: "available" },
      { position: "B11", status: "occupied" },
      { position: "A12", status: "available" },
      { position: "B12", status: "available" },
      { position: "A13", status: "available" },
      { position: "B13", status: "available" },
      { position: "A14", status: "available" },
      { position: "B14", status: "available" },
      { position: "A15", status: "available" },
      { position: "B15", status: "available" },
      { position: "A16", status: "available" },
      { position: "B16", status: "available" },
      { position: "A17", status: "available" },
      { position: "B17", status: "available" },
      { position: "A18", status: "available" },
      { position: "B18", status: "available" },
      { position: "A19", status: "available" },
      { position: "B19", status: "available" },
      { position: "A20", status: "available" },
      { position: "B20", status: "available" }
    ];
    return data
  } catch (error) {

  }
}