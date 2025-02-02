import LocationHandler from "../../../components/LocationHandler"

export default function ScanPage({
    params,
}: {
    params: { qrCodeId: string }
}) {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://qr-scan-mapper-tau.vercel.app"

    return <LocationHandler qrCodeId={params.qrCodeId} baseUrl={baseUrl} />
} 