"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, ArrowLeft, Share2, RotateCcw, ZoomIn, ZoomOut } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { ShareModelModal } from "@/components/share-model-modal"
import { garmentTypes } from "@/lib/data"

export default function DesignPage() {
  const [selectedGarment, setSelectedGarment] = useState("polo")
  const [uploadedDesign, setUploadedDesign] = useState<string | null>(null)
  const [showShareModal, setShowShareModal] = useState(false)
  const [designPosition, setDesignPosition] = useState({ x: 50, y: 50 })
  const [designSize, setDesignSize] = useState(100)
  const [designRotation, setDesignRotation] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setUploadedDesign(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleShare = () => {
    setShowShareModal(true)
  }

  const resetDesign = () => {
    setDesignPosition({ x: 50, y: 50 })
    setDesignSize(100)
    setDesignRotation(0)
  }

  const selectedGarmentData = garmentTypes.find((g) => g.id === selectedGarment)

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#3c2269] via-[#482880] to-[#27164e]">
      {/* Header */}
      <header className="p-6 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link href="/explore" className="text-white hover:text-[#905ce6] transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <Link href="/explore" className="text-white text-2xl font-bold hover:text-[#905ce6] transition-colors">
            TrendSpace
          </Link>
        </div>

        <h1 className="text-white text-xl font-semibold">Diseña tu modelo</h1>
      </header>

      <main className="px-6 pb-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Left Panel - Controls */}
            <div className="space-y-4">
              <Card className="bg-white/95 backdrop-blur-sm">
                <CardContent className="p-4">
                  <h3 className="text-sm font-semibold mb-3">Tipo de Prenda</h3>
                  <Select value={selectedGarment} onValueChange={setSelectedGarment}>
                    <SelectTrigger className="h-8 text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {garmentTypes.map((garment) => (
                        <SelectItem key={garment.id} value={garment.id}>
                          {garment.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>

              <Card className="bg-white/95 backdrop-blur-sm">
                <CardContent className="p-4">
                  <h3 className="text-sm font-semibold mb-3">Subir Diseño</h3>
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    variant="outline"
                    className="w-full h-20 border-dashed border-2 border-gray-300 hover:border-[#905ce6] transition-colors"
                    size="sm"
                  >
                    <div className="text-center">
                      <Upload className="w-5 h-5 mx-auto mb-1 text-gray-400" />
                      <p className="text-xs text-gray-600">Subir diseño</p>
                    </div>
                  </Button>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </CardContent>
              </Card>

              {uploadedDesign && (
                <>
                  <Card className="bg-white/95 backdrop-blur-sm">
                    <CardContent className="p-4">
                      <h3 className="text-sm font-semibold mb-3">Controles</h3>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setDesignSize(Math.max(50, designSize - 10))}
                          >
                            <ZoomOut className="w-3 h-3" />
                          </Button>
                          <span className="text-xs flex-1 text-center">{designSize}%</span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setDesignSize(Math.min(150, designSize + 10))}
                          >
                            <ZoomIn className="w-3 h-3" />
                          </Button>
                        </div>

                        <Button size="sm" variant="outline" onClick={resetDesign} className="w-full">
                          <RotateCcw className="w-3 h-3 mr-1" />
                          Reset
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/95 backdrop-blur-sm">
                    <CardContent className="p-4">
                      <h3 className="text-sm font-semibold mb-3">Vista Previa</h3>
                      <Image
                        src={uploadedDesign || "/placeholder.svg"}
                        alt="Diseño subido"
                        width={120}
                        height={120}
                        className="w-full h-20 object-contain border rounded-lg"
                      />
                    </CardContent>
                  </Card>
                </>
              )}
            </div>

            {/* Center Panel - Design Canvas */}
            <div className="lg:col-span-3">
              <Card className="bg-white/95 backdrop-blur-sm h-full">
                <CardContent className="p-6 h-full">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-semibold">Vista Previa del Diseño</h3>
                    {uploadedDesign && (
                      <Button onClick={handleShare} className="bg-[#905ce6] hover:bg-[#3c2269] text-white">
                        <Share2 className="w-4 h-4 mr-2" />
                        Share
                      </Button>
                    )}
                  </div>

                  <div className="relative bg-gray-900 rounded-lg p-8 min-h-[600px] flex items-center justify-center">
                    {/* Garment Base */}
                    <div className="relative">
                      <Image
                        src={selectedGarmentData?.image || "/placeholder.svg?height=500&width=400"}
                        alt={selectedGarmentData?.name || "Prenda"}
                        width={400}
                        height={500}
                        className="w-96 h-auto"
                      />

                      {/* Uploaded Design Overlay */}
                      {uploadedDesign && (
                        <div
                          className="absolute cursor-move"
                          style={{
                            top: `${designPosition.y}%`,
                            left: `${designPosition.x}%`,
                            transform: `translate(-50%, -50%) scale(${designSize / 100}) rotate(${designRotation}deg)`,
                          }}
                          onMouseDown={(e) => {
                            const startX = e.clientX
                            const startY = e.clientY
                            const startPosX = designPosition.x
                            const startPosY = designPosition.y

                            const handleMouseMove = (e: MouseEvent) => {
                              const deltaX = (e.clientX - startX) / 4
                              const deltaY = (e.clientY - startY) / 4
                              setDesignPosition({
                                x: Math.max(20, Math.min(80, startPosX + deltaX)),
                                y: Math.max(20, Math.min(80, startPosY + deltaY)),
                              })
                            }

                            const handleMouseUp = () => {
                              document.removeEventListener("mousemove", handleMouseMove)
                              document.removeEventListener("mouseup", handleMouseUp)
                            }

                            document.addEventListener("mousemove", handleMouseMove)
                            document.addEventListener("mouseup", handleMouseUp)
                          }}
                        >
                          <Image
                            src={uploadedDesign || "/placeholder.svg"}
                            alt="Diseño aplicado"
                            width={120}
                            height={120}
                            className="w-32 h-32 object-contain opacity-90 select-none"
                            style={{
                              filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.3))",
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  {!uploadedDesign && (
                    <div className="text-center mt-8">
                      <p className="text-gray-500">Sube un diseño para ver la vista previa en la prenda seleccionada</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      {/* Share Modal */}
      <ShareModelModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        designImage={uploadedDesign}
        garmentType={selectedGarmentData?.name || ""}
        designPosition={designPosition}
        designSize={designSize}
        designRotation={designRotation}
      />
    </div>
  )
}
