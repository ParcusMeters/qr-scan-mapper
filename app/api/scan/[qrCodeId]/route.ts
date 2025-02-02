import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { geolocation } from "@vercel/functions"

const prisma = new PrismaClient()

export async function GET(request: Request, { params }: { params: { qrCodeUrl: string } }) {
  const geo = geolocation(request)
  const ip = request.headers.get("x-forwarded-for") || "Unknown"

  try {
    const qrCode = await prisma.qRCode.findUnique({
      where: { url: params.qrCodeUrl },
    })

    if (!qrCode) {
      return NextResponse.json({ error: "Invalid QR code" }, { status: 400 })
    }

    const scan = await prisma.scan.create({
      data: {
        ip,
        latitude: Number(geo.latitude) || 0,
        longitude: Number(geo.longitude) || 0,
        qrCodeId: qrCode.id,
      },
    })

    return NextResponse.json({ success: true, scan })
  } catch (error) {
    console.error("Error saving scan:", error)
    return NextResponse.json({ error: "Failed to save scan" }, { status: 500 })
  }
}

