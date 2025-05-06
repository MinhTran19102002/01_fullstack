import { auth } from "@/auth"
import { adminRoutes, userRoutes } from "./routes/privateRoutes"
import { NextResponse } from "next/server"
import dayjs from "dayjs"
import { signOut } from "next-auth/react"

export default auth((req) => {
  const { nextUrl, auth } = req
  const isAminRoutes = adminRoutes.includes(nextUrl.pathname)
  const isUserRoutes = userRoutes.includes(nextUrl.pathname)
  const isAuthRoutes = nextUrl.pathname.includes("/auth")

  // chua dang nhap
  // Nếu cần custom page cho ng dùng khi thanh toán thì vào đây
  if (!auth && (isAminRoutes || isUserRoutes)) {
    return NextResponse.redirect(new URL("/auth/login", nextUrl));
  }
  // Nếu đã có token
  if (auth && (isAminRoutes || isUserRoutes)) {
    const isTokenExpired = dayjs().isAfter(dayjs(auth.access_expire));
    //true la het han false la het han
    if (isTokenExpired) {
      return NextResponse.redirect(new URL("/auth/login", nextUrl));
    }

    if ((isAminRoutes && auth.user.role !== "admin") || (isUserRoutes && auth.user.role === "admin")) {
      return NextResponse.redirect(new URL("/not-found", nextUrl));
    }
  }

  // Có token nhưng đang ở trang đăng nhập
  if (isAuthRoutes && auth) {
    const isTokenExpired = dayjs().isAfter(dayjs(auth.access_expire));
    if (isTokenExpired) {
      return
    }
    if (auth.user.role === "admin") {
      return NextResponse.redirect(new URL("/dashboard", nextUrl));
    }
    if (auth.user.role === "guest" || auth.user.role === "driver") {
      return NextResponse.redirect(new URL("/home", nextUrl));
    }
  }
  // 
})

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}