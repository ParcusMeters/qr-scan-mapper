"use client"

import { useEffect, useState } from "react"
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api"

type Scan = {
  id: string
  ip: string
  latitude: number
  longitude: number
  createdAt: string
}

const mapContainerStyle = {
  width: "100%",
  height: "600px",
}

const center = {
  lat: 0,
  lng: 0,
}

export default function Map() {
  const [scans, setScans] = useState<Scan[]>([])
  const [selectedScan, setSelectedScan] = useState<Scan | null>(null)
  const [consentGiven, setConsentGiven] = useState(false)

  useEffect(() => {
    if (consentGiven) {
      fetch("/api/scans")
        .then((res) => res.json())
        .then((data) => setScans(data))
    }
  }, [consentGiven])

  if (!consentGiven) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Consent Required</h2>
          <p className="mb-4">We need your consent to access and display location data.</p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => setConsentGiven(true)}>
            I Consent
          </button>
        </div>
      </div>
    )
  }

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
      <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={2}>
        {scans.map((scan) => (
          <Marker
            key={scan.id}
            position={{ lat: scan.latitude, lng: scan.longitude }}
            onClick={() => setSelectedScan(scan)}
          />
        ))}

        {selectedScan && (
          <InfoWindow
            position={{ lat: selectedScan.latitude, lng: selectedScan.longitude }}
            onCloseClick={() => setSelectedScan(null)}
          >
            <div>
              <h2>Scan Details</h2>
              <p>IP: {selectedScan.ip}</p>
              <p>Scanned at: {new Date(selectedScan.createdAt).toLocaleString()}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  )
}

