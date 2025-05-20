"use client"
import { useSession } from "next-auth/react"

export default function Dashboard() {
  const { data: session } = useSession()

  if (session) {
    return <p>You are an admin, welcome!</p>
  }

  return <p>You are not authorized to view this page!</p>
}