'use server'
import { signIn } from "@/auth";
import { sendRequest } from "../api";
import { auth } from "@/auth"



export async function authenticate(email: string, password: string) {
  try {
    const r = await signIn("credentials", {
      email: email,
      password: password,
      redirect: false,
    })
    return r
  } catch (error) {
    if ((error as any).name === "InvalidEmailPasswordError") {
      return {
        "error": (error as any).type, code: 1
      }
    } else if ((error as any).name === "InactiveAccountError") {
      return {
        "error": (error as any).type, code: 2
      }
    } else {
      return {
        "error": "Internal server error", code: 0
      }
    }

  }
}


export async function userAll() {
  try {
    // const { data: session } = useSession()
    // console.log(session)
    const sesion = await auth();
    const token = sesion?.user.access_token;
    const r = await sendRequest<IBackendRes<IListMeta<IUser>>>({
      method: "GET",
      url: `${process.env.NEXT_PUBLIC_BACKEND}/v1/users`,
      token: token
    })
    return r
  } catch (error) {

  }
}

export async function userUpdate(user: any) {
  try {
    // const { data: session } = useSession()
    // console.log(session)
    const sesion = await auth();
    const token = sesion?.user.access_token;
    const r = await sendRequest<IBackendRes<IListMeta<IUser>>>({
      method: "PATCH",
      url: `${process.env.NEXT_PUBLIC_BACKEND}/v1/users`,
      token: token,
      body: {
        ...user
      }
    })
    return r
  } catch (error) {

  }
}


export async function userAdd(user: any) {
  try {
    // const { data: session } = useSession()
    // console.log(session)
    const sesion = await auth();
    const token = sesion?.user.access_token;
    const r = await sendRequest<IBackendRes<IListMeta<IUser>>>({
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_BACKEND}/v1/users`,
      token: token,
      body: {
        ...user
      }
    })
    return r
  } catch (error) {

  }
}

export async function userDelete(_id: string) {
  try {
    // const { data: session } = useSession()
    // console.log(session)
    const sesion = await auth();
    const token = sesion?.user.access_token;
    const r = await sendRequest<IBackendRes<any>>({
      method: "DELETE",
      url: `${process.env.NEXT_PUBLIC_BACKEND}/v1/users`,
      token: token,
      param: _id
    })
    return r
  } catch (error) {

  }
}

export async function getUser() {
  try {
    // const { data: session } = useSession()
    // console.log(session)
    const sesion = await auth();
    return sesion
  } catch (error) {

  }
}