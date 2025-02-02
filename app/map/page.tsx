"use client"

import React from "react"
import dynamic from "next/dynamic"

const MapWithNoSSR = dynamic(() => import("../../components/Map"), {
    ssr: false,
})

export default function MapPage() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <h1 className="text-4xl font-bold mb-8">QR Code Scan Map</h1>
            <MapWithNoSSR />
        </main>
    )
} 