"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, MessageCircle, User } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { allDesigns } from "@/lib/data"

export default function HomePage() {
  const [displayDesigns, setDisplayDesigns] = useState(allDesigns)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Cargar diseños guardados del localStorage
    const loadDesigns = async () => {
      setIsLoading(true)
      try {
        const savedDesigns = localStorage.getItem("trendspace-user-designs")
        if (savedDesigns) {
          const userDesigns = JSON.parse(savedDesigns)
          // Asegurarse de que las imágenes estén cargadas correctamente
          setDisplayDesigns([...userDesigns, ...allDesigns])
        }
      } catch (error) {
        console.error("Error loading saved designs:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadDesigns()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#3c2269] via-[#482880] to-[#27164e]">
      {/* Header */}
      <header className="p-6 flex justify-between items-center">
        <Link href="/" className="text-white text-2xl font-bold hover:text-[#905ce6] transition-colors">
          TrendSpace
        </Link>

        <div className="flex items-center space-x-6">
          <Link href="/design" className="text-white hover:text-[#905ce6] transition-colors font-medium">
            Diseña tu modelo
          </Link>
          <Link href="/account" className="text-white hover:text-[#905ce6] transition-colors">
            <User className="w-6 h-6" />
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 pb-12">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-white text-3xl font-bold mb-8 text-center">Descubre Diseños Únicos</h1>

          {/* Designs Grid */}
          {isLoading ? (
            <div className="text-center text-white py-12">Cargando diseños...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {displayDesigns.map((design) => (
                <Link key={design.id} href={`/design/${design.id}`}>
                  <Card className="bg-white/95 backdrop-blur-sm hover:bg-white transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer">
                    <CardContent className="p-0">
                      <div className="relative">
                        <Image
                          src={design.image || "/placeholder.svg?height=300&width=250"}
                          alt={design.title}
                          width={250}
                          height={300}
                          className="w-full h-64 object-cover rounded-t-lg"
                          priority={true}
                        />

                        {/* Progress bar */}
                        <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-2">
                          <div className="w-full bg-gray-300 rounded-full h-2 mb-1">
                            <div
                              className={`h-2 rounded-full transition-all duration-300 ${
                                design.hasReachedGoal ? "bg-green-500" : "bg-[#905ce6]"
                              }`}
                              style={{ width: `${Math.min((design.likes / design.goal) * 100, 100)}%` }}
                            ></div>
                          </div>
                          <p className="text-white text-xs">
                            {design.likes}/{design.goal} me gusta
                            {design.hasReachedGoal && " ✓"}
                          </p>
                        </div>
                      </div>

                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 mb-2">{design.title}</h3>
                        <p className="text-sm text-gray-600 mb-3">por {design.designer}</p>

                        <div className="flex justify-between items-center">
                          <div className="flex items-center space-x-3">
                            <div className="flex items-center space-x-1">
                              <Heart className="w-4 h-4 text-red-500" />
                              <span className="text-sm text-gray-600">{design.likes}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MessageCircle className="w-4 h-4 text-gray-500" />
                              <span className="text-sm text-gray-600">{design.comments || 0}</span>
                            </div>
                          </div>

                          <div className="text-right">
                            <p className="text-lg font-bold text-[#905ce6]">S/ {design.price}</p>
                            {design.hasReachedGoal && <p className="text-xs text-green-600 font-medium">Disponible</p>}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
