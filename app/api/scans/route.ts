import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { cookies } from "next/headers"

const prisma = new PrismaClient()

export async function GET(request: Request) {
  const cookieStore = cookies()
  const hasScanned = cookieStore.get("hasScanned")

  if (!hasScanned) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const scans = await prisma.scan.findMany()
    return NextResponse.json(scans)
  } catch (error) {
    console.error("Error fetching scans:", error)
    return NextResponse.json({ error: "Failed to fetch scans" }, { status: 500 })
  }
}

