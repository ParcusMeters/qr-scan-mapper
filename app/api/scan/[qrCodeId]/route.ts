import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { cookies } from "next/headers"

const prisma = new PrismaClient()

export async function GET(request: Request, { params }: { params: { qrCodeId: string } }) {
  const ip = request.headers.get("x-forwarded-for") || "Unknown"
  const searchParams = new URL(request.url).searchParams
  const latitude = searchParams.get("latitude")
  const longitude = searchParams.get("longitude")

  // If coordinates aren't available, redirect back to the scan page
  if (!latitude || !longitude) {
    return NextResponse.redirect(new URL(`/scan/${params.qrCodeId}`, request.url))
  }

  try {
    const qrCode = await prisma.qRCode.findUnique({
      where: { id: params.qrCodeId },
    })

    if (!qrCode) {
      return NextResponse.json({ error: "Invalid QR code" }, { status: 400 })
    }

    const scan = await prisma.scan.create({
      data: {
        ip,
        latitude: Number(latitude),
        longitude: Number(longitude),
        qrCodeId: qrCode.id,
      },
    })

    // Create the response with redirect
    const response = NextResponse.redirect(new URL("/map", request.url))

    // Set the hasScanned cookie
    response.cookies.set("hasScanned", "true", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/"
    })

    return response
  } catch (error) {
    console.error("Error saving scan:", error)
    return NextResponse.json({ error: "Failed to save scan" }, { status: 500 })
  }
}

