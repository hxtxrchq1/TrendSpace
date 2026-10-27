"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image"

interface ShareModelModalProps {
  isOpen: boolean
  onClose: () => void
  designImage: string | null
  garmentType: string
  designPosition?: { x: number; y: number }
  designSize?: number
  designRotation?: number
}

const collections = ["Verano 2024", "Vintage Collection", "Urban Style", "Minimalist"]

export function ShareModelModal({
  isOpen,
  onClose,
  designImage,
  garmentType,
  designPosition = { x: 50, y: 50 },
  designSize = 100,
  designRotation = 0,
}: ShareModelModalProps) {
  const [showSuccess, setShowSuccess] = useState(false)
  const [compositeImage, setCompositeImage] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    collection: "",
    goal: "400", // Meta automática
  })

  // Generar imagen compuesta cuando se abra el modal
  useEffect(() => {
    if (isOpen && designImage && garmentType) {
      generateCompositeImage()
    }
  }, [isOpen, designImage, garmentType, designPosition, designSize, designRotation])

  const generateCompositeImage = async () => {
    if (!canvasRef.current || !designImage) return

    setIsGenerating(true)

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) {
      setIsGenerating(false)
      return
    }

    // Configurar canvas
    canvas.width = 400
    canvas.height = 500

    try {
      // Cargar imagen de la prenda
      let garmentSrc = ""
      if (garmentType === "Hoodie") {
        garmentSrc = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/hoodie-XzL7Q4U6SS7QAdRxHn6MmFzgYKc3Or.png"
      } else if (garmentType === "Polo") {
        garmentSrc = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/polo-gaZ4jZrxv1OcXU3xjZuAotlkYiQeNb.png"
      } else if (garmentType === "Pant") {
        garmentSrc =
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pant%20mockup.jpg-gf67ARCdItlFS0mEZClgeol43zyw1L.png"
      }

      await new Promise<void>((resolve, reject) => {
        const garmentImg = new Image()
        garmentImg.crossOrigin = "anonymous"

        garmentImg.onload = (event) => {
          try {
            // Dibujar la prenda
            ctx.drawImage(garmentImg, 0, 0, canvas.width, canvas.height)

            // Cargar y dibujar el diseño
            const designImg = new Image()
            designImg.crossOrigin = "anonymous"

            designImg.onload = (designEvent) => {
              try {
                // Calcular posición y tamaño del diseño
                const designWidth = (120 * designSize) / 100
                const designHeight = (120 * designSize) / 100
                const x = (canvas.width * designPosition.x) / 100 - designWidth / 2
                const y = (canvas.height * designPosition.y) / 100 - designHeight / 2

                // Aplicar transformaciones
                ctx.save()
                ctx.translate(x + designWidth / 2, y + designHeight / 2)
                ctx.rotate((designRotation * Math.PI) / 180)
                ctx.globalAlpha = 0.9
                ctx.drawImage(designImg, -designWidth / 2, -designHeight / 2, designWidth, designHeight)
                ctx.restore()

                // Convertir canvas a imagen
                const compositeDataUrl = canvas.toDataURL("image/png")
                setCompositeImage(compositeDataUrl)
                resolve()
              } catch (error) {
                console.error("Error drawing design:", error)
                reject(error)
              }
            }

            designImg.onerror = (designError) => {
              console.error("Failed to load design image:", designError)
              reject(new Error("Failed to load design image"))
            }

            designImg.src = designImage
          } catch (error) {
            console.error("Error drawing garment:", error)
            reject(error)
          }
        }

        garmentImg.onerror = (garmentError) => {
          console.error("Failed to load garment image:", garmentError)
          reject(new Error("Failed to load garment image"))
        }

        garmentImg.src = garmentSrc
      })
    } catch (error) {
      console.error("Error generando imagen compuesta:", error)
      setCompositeImage(designImage) // Fallback a la imagen original
    } finally {
      setIsGenerating(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Si está generando la imagen, esperar
    if (isGenerating) {
      alert("Por favor espera mientras se genera la vista previa")
      return
    }

    // Si no hay imagen compuesta, intentar generarla una vez más
    if (!compositeImage && designImage) {
      try {
        await generateCompositeImage()
      } catch (error) {
        console.error("Error al generar imagen:", error)
        alert("No se pudo generar la vista previa. Por favor intenta de nuevo.")
        return
      }
    }

    // Verificar que tengamos la imagen compuesta
    if (!compositeImage) {
      alert("No se pudo generar la vista previa. Por favor intenta de nuevo.")
      return
    }

    // Obtener diseños existentes del localStorage
    const existingDesigns = JSON.parse(localStorage.getItem("trendspace-user-designs") || "[]")

    // Crear el nuevo diseño con la imagen compuesta
    const newDesign = {
      id: Date.now(),
      image: compositeImage,
      title: formData.name,
      likes: 0,
      comments: 0,
      goal: Number.parseInt(formData.goal),
      price: Number.parseInt(formData.price),
      designer: "Usuario Actual",
      description: formData.description || "Diseño único creado por la comunidad de TrendSpace",
      hasReachedGoal: false,
      reservations: 0,
      collection: formData.collection || "Nueva Colección",
    }

    // Agregar el nuevo diseño al principio de la lista
    const updatedDesigns = [newDesign, ...existingDesigns]

    // Guardar en localStorage
    localStorage.setItem("trendspace-user-designs", JSON.stringify(updatedDesigns))

    setShowSuccess(true)
    setTimeout(() => {
      setShowSuccess(false)
      onClose()
      // Recargar la página para mostrar el nuevo diseño
      window.location.href = "/explore"
    }, 3000)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  if (showSuccess) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md text-center">
          <div className="space-y-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xl">✓</span>
              </div>
            </div>
            <h2 className="text-xl font-bold">¡Diseño Subido Correctamente!</h2>
            <p className="text-gray-600">
              Tu diseño ha sido publicado en TrendSpace y ya está disponible para que la comunidad lo descubra.
            </p>
            <Button onClick={onClose} className="bg-[#905ce6] hover:bg-[#3c2269] text-white">
              Continuar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center">Compartir Modelo</DialogTitle>
        </DialogHeader>

        {/* Canvas oculto para generar la imagen compuesta */}
        <canvas ref={canvasRef} style={{ display: "none" }} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Side - Preview */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Vista Previa</h3>
            <div className="bg-gray-50 rounded-lg p-6 flex items-center justify-center min-h-[400px]">
              {isGenerating ? (
                <div className="text-center">
                  <p className="text-gray-500 mb-2">Generando vista previa...</p>
                  <div className="w-8 h-8 border-4 border-t-[#905ce6] border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin mx-auto"></div>
                </div>
              ) : designImage ? (
                <div className="relative">
                  {garmentType === "Hoodie" && (
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/hoodie-XzL7Q4U6SS7QAdRxHn6MmFzgYKc3Or.png"
                      alt="Hoodie base"
                      width={300}
                      height={400}
                      className="w-64 h-auto"
                    />
                  )}
                  {garmentType === "Polo" && (
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/polo-gaZ4jZrxv1OcXU3xjZuAotlkYiQeNb.png"
                      alt="Polo base"
                      width={300}
                      height={400}
                      className="w-64 h-auto"
                    />
                  )}
                  {garmentType === "Pant" && (
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pant%20mockup.jpg-gf67ARCdItlFS0mEZClgeol43zyw1L.png"
                      alt="Pant base"
                      width={300}
                      height={400}
                      className="w-64 h-auto"
                    />
                  )}

                  {/* Diseño aplicado con la posición exacta del usuario */}
                  <div
                    className="absolute"
                    style={{
                      top: `${designPosition.y}%`,
                      left: `${designPosition.x}%`,
                      transform: `translate(-50%, -50%) scale(${designSize / 100}) rotate(${designRotation}deg)`,
                    }}
                  >
                    <Image
                      src={designImage || "/placeholder.svg"}
                      alt="Diseño aplicado"
                      width={120}
                      height={120}
                      className="w-28 h-28 object-contain opacity-90"
                      style={{
                        filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.3))",
                      }}
                    />
                  </div>
                </div>
              ) : (
                <p className="text-gray-500">Vista previa del diseño</p>
              )}
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Nombre del Modelo</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Ej: Cherry Vintage Tee"
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Descripción</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="Describe tu diseño..."
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="price">Precio Aproximado (S/)</Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.price}
                  onChange={(e) => handleInputChange("price", e.target.value)}
                  placeholder="120"
                  required
                />
              </div>

              <div>
                <Label htmlFor="goal">Meta de Me Gusta</Label>
                <Input
                  id="goal"
                  type="number"
                  value={formData.goal}
                  onChange={(e) => handleInputChange("goal", e.target.value)}
                  placeholder="400"
                  disabled
                />
                <p className="text-xs text-gray-500 mt-1">Meta automática basada en el tipo de prenda</p>
              </div>

              <div>
                <Label htmlFor="collection">Colección</Label>
                <Select onValueChange={(value) => handleInputChange("collection", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una colección" />
                  </SelectTrigger>
                  <SelectContent>
                    {collections.map((collection) => (
                      <SelectItem key={collection} value={collection}>
                        {collection}
                      </SelectItem>
                    ))}
                    <SelectItem value="new">+ Nueva Colección</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex space-x-3 pt-6">
                <Button type="button" variant="outline" onClick={onClose} className="flex-1">
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-[#905ce6] hover:bg-[#3c2269] text-white"
                  disabled={isGenerating}
                >
                  {isGenerating ? "Generando..." : "Publicar Diseño"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
