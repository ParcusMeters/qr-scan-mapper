"use client"

import { useEffect, useState } from "react"

interface LocationHandlerProps {
    qrCodeId: string
    baseUrl: string
}

// Custom error class for geolocation errors
class GeolocationError extends Error {
    constructor(message: string) {
        super(message)
        this.name = 'GeolocationError'
    }
}

// Promise-based wrapper for geolocation API
const getCurrentPosition = (): Promise<GeolocationPosition> => {
    return new Promise((resolve, reject) => {
        if (!("geolocation" in navigator)) {
            reject(new GeolocationError("Geolocation is not supported by your browser"))
            return
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                resolve(position)
            },
            (error) => {
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
                reject(new GeolocationError(errorMessage))
            },
            {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            }
        )
    })
}

export default function LocationHandler({ qrCodeId, baseUrl }: LocationHandlerProps) {
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const handleScan = async () => {
            try {
                const position = await getCurrentPosition()
                setIsLoading(false)
                // Only redirect after we have the position
                const url = `${baseUrl}/api/scan/${qrCodeId}?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}`
                window.location.href = url
            } catch (err) {
                setIsLoading(false)
                if (err instanceof GeolocationError) {
                    setError(err.message)
                } else {
                    setError('Failed to process scan. Please try again.')
                }
            }
        }

        handleScan()
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

    if (isLoading) {
        return (
            <div className="text-center">
                <p>Getting your location...</p>
                <p className="text-sm text-gray-500 mt-2">Please allow location access when prompted</p>
            </div>
        )
    }

    return null
} 