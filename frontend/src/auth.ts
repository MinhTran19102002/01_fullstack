import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { InactiveAccountError, InvalidEmailPasswordError } from "./utils/errors"
import { sendRequest } from "./utils/api"
import { DecodedToken, IUser } from "./types/next-auth"
import { jwtDecode } from "jwt-decode"


export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials): Promise<any> => {
        let user = null
        user = await sendRequest<IBackendRes<ILogin>>({
          method: "POST",
          url: `${process.env.NEXT_PUBLIC_BACKEND}/v1/auth/login`,
          body: {
            ...credentials
          }
        })
        if (+user.statusCode === 201) {
          console.log("dang nhap thanh cong")
          return {
            _id: user.data?.user._id,
            email: user.data?.user.email,
            name: user.data?.user.name,
            role: user.data?.user.role,
            access_token: user.data?.access_token,
          }
        } else if (+user.statusCode === 401) {
          throw new InvalidEmailPasswordError()
        } else if (+user.statusCode === 403) {
          throw new InactiveAccountError()
        } else {
          throw new Error()
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    jwt({ token, user, account }) {
      if (user) { // User is available during sign-in
        token.user = (user as IUser)
        const decoded: DecodedToken = jwtDecode((user as IUser).access_token);
        token.access_expire = decoded.exp * 1000;
      }
      return token
    },
    session({ session, token }) {
      (session.user as IUser) = token.user;
      (session as any).access_expire = token.access_expire;
      return session
    },
    // authorized: async ({ auth }) => {
    //   // Logged in users are authenticated, otherwise redirect to login page
    //   return !!auth
    // },
  },
})