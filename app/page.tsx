"use client"

import React from "react"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">QR Code Scan Map</h1>

      <div className="max-w-2xl text-center space-y-6">
        <p className="text-lg">
          Track and visualize QR code scans from around the world in real-time.
        </p>

        <div className="bg-gray-100 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">How it works:</h2>
          <ol className="text-left space-y-3">
            <li>1. Scan any QR code from our system</li>
            <li>2. Your scan location will be anonymously recorded</li>
            <li>3. View all scan locations on our interactive global map</li>
          </ol>
        </div>

        <div className="mt-8">
          <p className="text-sm text-gray-600">
            Privacy note: We only collect approximate location data and no personal information is stored.
          </p>
        </div>
      </div>
    </main>
  )
}

