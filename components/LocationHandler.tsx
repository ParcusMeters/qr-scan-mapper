"use client"

import { useEffect, useState } from "react"

interface LocationHandlerProps {
    qrCodeId: string
    baseUrl: string
}

export default function LocationHandler({ qrCodeId, baseUrl }: LocationHandlerProps) {
    const [error, setError] = useState<string | null>(null)

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
                        // Handle specific errors
                        let errorMessage = "Unable to get your location. "
                        switch (error.code) {
                            case error.PERMISSION_DENIED:
                                errorMessage += "Please enable location access and try again."
                                break
                            case error.POSITION_UNAVAILABLE:
                                errorMessage += "Location information is unavailable."
                                break
                            case error.TIMEOUT:
                                errorMessage += "Location request timed out."
                                break
                            default:
                                errorMessage += "An unknown error occurred."
                        }
                        setError(errorMessage)
                    },
                    {
                        enableHighAccuracy: true,
                        timeout: 5000,
                        maximumAge: 0
                    }
                )
            } else {
                setError("Geolocation is not supported by your browser")
            }
        }

        getLocationAndRedirect()
    }, [qrCodeId, baseUrl])

    if (error) {
        return (
            <div className="text-red-500 text-center">
                <p>{error}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Try Again
                </button>
            </div>
        )
    }

    return null // Loading state is handled by parent
} 