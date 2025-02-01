"use client"

import React from "react"
import { useState } from "react"
import type { FormEvent } from "react"
import dynamic from "next/dynamic"

const MapWithNoSSR = dynamic(() => import("../components/Map"), {
  ssr: false,
})

export default function Home() {
  const [hasScanned, setHasScanned] = useState(false)
  const [qrCodeId, setQrCodeId] = useState("")

  const handleScan = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const response = await fetch(`/api/scan/${qrCodeId}`)
    if (response.ok) {
      setHasScanned(true)
    } else {
      alert("Invalid QR code")
    }
  }

  if (!hasScanned) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <h1 className="text-4xl font-bold mb-8">QR Code Scan Map</h1>
        <form onSubmit={handleScan} className="space-y-4">
          <input
            type="text"
            value={qrCodeId}
            onChange={(e) => setQrCodeId(e.target.value)}
            placeholder="Enter QR Code ID"
            className="px-4 py-2 border rounded"
          />
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
            Submit
          </button>
        </form>
      </main>
    )
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold mb-8">QR Code Scan Map</h1>
      <MapWithNoSSR />
    </main>
  )
}

