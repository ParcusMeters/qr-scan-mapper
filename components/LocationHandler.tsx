"use client"

import { useEffect } from "react"

interface LocationHandlerProps {
    qrCodeId: string
    baseUrl: string
}

export default function LocationHandler({ qrCodeId, baseUrl }: LocationHandlerProps) {
    useEffect(() => {
        const getLocationAndRedirect = () => {
            if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        // Success - redirect with precise coordinates
                        const url = `${baseUrl}/api/scan/${qrCodeId}?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}`
                        window.location.href = url
                    },
                    (error) => {
                        // Error or denied - redirect without coordinates (will use IP fallback)
                        const url = `${baseUrl}/api/scan/${qrCodeId}`
                        window.location.href = url
                    }
                )
            } else {
                // Geolocation not supported - redirect without coordinates (will use IP fallback)
                const url = `${baseUrl}/api/scan/${qrCodeId}`
                window.location.href = url
            }
        }

        getLocationAndRedirect()
    }, [qrCodeId, baseUrl])

    return (
        <div className="flex min-h-screen flex-col items-center justify-center p-24">
            <h1 className="text-2xl font-bold mb-4">Requesting Location Access</h1>
            <p className="text-gray-600">Please allow location access for better accuracy...</p>
        </div>
    )
} 