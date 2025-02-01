import QRCode from "qrcode"
import { PrismaClient } from "@prisma/client"
import fs from "fs"

const prisma = new PrismaClient()

async function generateQRCodes(count: number) {
  for (let i = 0; i < count; i++) {
    const qrCode = await prisma.qRCode.create({
      data: {
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/scan/${Date.now()}-${i}`,
      },
    })

    const qrCodeDataUrl = await QRCode.toDataURL(qrCode.url)
    const qrCodeBase64 = qrCodeDataUrl.split(",")[1]
    fs.writeFileSync(`./public/qrcodes/${qrCode.id}.png`, qrCodeBase64, "base64")

    console.log(`Generated QR code: ${qrCode.id}`)
  }
}

generateQRCodes(1) // Generate 100 QR codes

