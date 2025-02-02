import LocationHandler from "../../../components/LocationHandler"

export default function ScanPage({
    params,
}: {
    params: { qrCodeId: string }
}) {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://qr-scan-mapper-tau.vercel.app"

    return (
        <div className="flex min-h-screen flex-col items-center justify-center p-24">
            <h1 className="text-2xl font-bold mb-4">Getting Location...</h1>
            <p className="text-gray-600 mb-8">Please allow location access to continue</p>
            <LocationHandler qrCodeId={params.qrCodeId} baseUrl={baseUrl} />
        </div>
    )
} 