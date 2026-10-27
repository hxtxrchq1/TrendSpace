"use client" // ¡IMPORTANTE: "use client" va aquí!

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Heart, MessageCircle, ArrowLeft, Share2, Users } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { ReserveModal } from "@/components/reserve-modal"
import { PaymentModal } from "@/components/payment-modal"
import { getDesignById, allDesigns } from "@/lib/data"

// Este es el componente que se ejecutará en el cliente
export default function DesignDetailsClient({ designId }: { designId: number }) { // Cambiado 'params' a 'designId'
  const [design, setDesign] = useState<any>(null)
  const [relatedDesigns, setRelatedDesigns] = useState<any[]>([])
  const [liked, setLiked] = useState(false)
  const [showReserveModal, setShowReserveModal] = useState(false)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [newComment, setNewComment] = useState("")
  const [comments, setComments] = useState<any[]>([])

  useEffect(() => {
    let foundDesign = getDesignById(designId)

    if (typeof window !== "undefined") {
      if (!foundDesign) {
        const savedDesigns = JSON.parse(localStorage.getItem("trendspace-user-designs") || "[]")
        foundDesign = savedDesigns.find((d: any) => d.id === designId)
      }
    }

    setDesign(foundDesign)

    if (foundDesign) {
      const isUserCreated = !getDesignById(designId)
      if (isUserCreated) {
        setComments([])
      } else {
        setComments([
          {
            id: 1,
            user: "Ana Rodriguez",
            comment: "¡Me encanta este diseño! Definitivamente lo reservaré.",
            time: "hace 2 horas",
          },
          {
            id: 2,
            user: "Carlos Mendez",
            comment: "El estilo vintage está increíble, muy original.",
            time: "hace 5 horas",
          },
        ])
      }
    }

    if (foundDesign) {
      let allAvailableDesigns = [...allDesigns]
      if (typeof window !== "undefined") {
        const savedDesigns = JSON.parse(localStorage.getItem("trendspace-user-designs") || "[]")
        allAvailableDesigns = [...savedDesigns, ...allAvailableDesigns]
      }
      const related = allAvailableDesigns.filter((d: any) => d.id !== designId).slice(0, 3)
      setRelatedDesigns(related)
    }
  }, [designId])

  if (!design) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#3c2269] via-[#482880] to-[#27164e] flex items-center justify-center">
        <div className="text-white text-center">
          <h1 className="text-2xl font-bold mb-4">Diseño no encontrado</h1>
          <Link href="/explore">
            <Button className="bg-[#905ce6] hover:bg-[#3c2269] text-white">Volver a Explorar</Button>
          </Link>
        </div>
      </div>
    )
  }

  const handleLike = () => {
    const newLikedState = !liked
    setLiked(newLikedState)

    const updatedLikes = design.likes + (newLikedState ? 1 : -1)
    setDesign({ ...design, likes: updatedLikes })

    if (typeof window !== "undefined") {
      const savedDesigns = JSON.parse(localStorage.getItem("trendspace-user-designs") || "[]")
      const designIndex = savedDesigns.findIndex((d: any) => d.id === designId)
      if (designIndex !== -1) {
        savedDesigns[designIndex].likes = updatedLikes
        localStorage.setItem("trendspace-user-designs", JSON.stringify(savedDesigns))
      }
    }
  }

  const handleComment = () => {
    if (newComment.trim()) {
      const comment = {
        id: comments.length + 1,
        user: "Usuario Actual",
        comment: newComment,
        time: "ahora",
      }
      setComments([comment, ...comments])
      setNewComment("")
    }
  }

  const handleReserve = () => {
    setShowReserveModal(true)
  }

  const handleBuy = () => {
    setShowReserveModal(true)
  }

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

        <div className="flex items-center space-x-6">
          <Link href="/design" className="text-white hover:text-[#905ce6] transition-colors font-medium">
            Diseña tu modelo
          </Link>
          <Link href="/account" className="text-white hover:text-[#905ce6] transition-colors">
            <Share2 className="w-6 h-6" />
          </Link>
        </div>
      </header>

      <main className="px-6 pb-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Image */}
            <div className="space-y-6">
              <Card className="bg-white/95 backdrop-blur-sm">
                <CardContent className="p-6">
                  <Image
                    src={design.image || "/placeholder.svg?height=600&width=500"}
                    alt={design.title}
                    width={500}
                    height={600}
                    className="w-full h-auto rounded-lg"
                  />
                </CardContent>
              </Card>

              {/* Related Designs */}
              <Card className="bg-white/95 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Diseños Relacionados</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {relatedDesigns.map((relatedDesign) => (
                      <Link key={relatedDesign.id} href={`/design/${relatedDesign.id}`}>
                        <div className="cursor-pointer hover:scale-105 transition-transform">
                          <Image
                            src={relatedDesign.image || "/placeholder.svg?height=200&width=150"}
                            alt={relatedDesign.title}
                            width={150}
                            height={200}
                            className="w-full h-32 object-cover rounded-lg mb-2"
                          />
                          <p className="text-sm font-medium">{relatedDesign.title}</p>
                          <p className="text-xs text-gray-600">{relatedDesign.likes} likes</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Details */}
            <div className="space-y-6">
              <Card className="bg-white/95 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{design.title}</h1>
                  <p className="text-lg text-gray-600 mb-4">por {design.designer}</p>

                  <p className="text-gray-700 mb-6">{design.description}</p>

                  {/* Reservations Counter - Solo mostrar si hay reservaciones */}
                  {!design.hasReachedGoal && design.reservations > 0 && (
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6">
                      <div className="flex items-center space-x-2 mb-2">
                        <Users className="w-5 h-5 text-purple-600" />
                        <span className="text-lg font-semibold text-purple-800">
                          {design.reservations} personas ya han reservado este producto!
                        </span>
                      </div>
                      <div className="text-sm text-purple-600 space-y-1">
                        <p>⭐ Alcanza el objetivo de "me gusta" para hacerlo realidad</p>
                        <p>
                          👥 Una vez que el diseño alcance el objetivo, el diseñador recibirá una comisión y nosotros
                          nos encargaremos del producto y toda la logística
                        </p>
                        <p>
                          💰 El cobro final solo se realiza si el diseño alcanza su meta de "me gusta". Si no se alcanza
                          la meta, el dinero reservado será devuelto
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Progress */}
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">
                        {design.hasReachedGoal ? "Meta alcanzada" : "Progreso de meta"}
                      </span>
                      <span className="text-sm text-gray-600">
                        {design.likes}/{design.goal} me gusta
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full transition-all duration-300 ${
                          design.hasReachedGoal ? "bg-green-500" : "bg-[#905ce6]"
                        }`}
                        style={{ width: `${Math.min((design.likes / design.goal) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-4 mb-6">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleLike}
                      className={`flex items-center space-x-2 ${liked ? "text-red-500 border-red-500" : ""}`}
                    >
                      <Heart className={`w-4 h-4 ${liked ? "fill-current" : ""}`} />
                      <span>{design.likes}</span>
                    </Button>

                    <div className="flex items-center space-x-2 text-gray-600">
                      <MessageCircle className="w-4 h-4" />
                      <span>{comments.length}</span>
                    </div>
                  </div>

                  {/* Price and Action Button */}
                  <div className="border-t pt-6">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-2xl font-bold text-[#905ce6]">S/ {design.price}</span>
                      {design.hasReachedGoal ? (
                        <span className="text-green-600 font-medium">¡Meta alcanzada!</span>
                      ) : (
                        <span className="text-orange-600 font-medium">En progreso</span>
                      )}
                    </div>

                    {design.hasReachedGoal ? (
                      <Button onClick={handleBuy} className="w-full bg-[#905ce6] hover:bg-[#3c2269] text-white">
                        Comprar Ahora
                      </Button>
                    ) : (
                      <Button onClick={handleReserve} className="w-full bg-[#905ce6] hover:bg-[#3c2269] text-white">
                        Resérvalo aquí
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Comments Section */}
              <Card className="bg-white/95 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Comentarios</h3>

                  {/* Add Comment */}
                  <div className="mb-6">
                    <Textarea
                      placeholder="Escribe un comentario..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="mb-3"
                    />
                    <Button onClick={handleComment} size="sm" className="bg-[#905ce6] hover:bg-[#3c2269] text-white">
                      Comentar
                    </Button>
                  </div>

                  {/* Comments List */}
                  <div className="space-y-4">
                    {comments.length > 0 ? (
                      comments.map((comment) => (
                        <div key={comment.id} className="border-b pb-4 last:border-b-0">
                          <div className="flex justify-between items-start mb-2">
                            <span className="font-medium text-gray-900">{comment.user}</span>
                            <span className="text-xs text-gray-500">{comment.time}</span>
                          </div>
                          <p className="text-gray-700">{comment.comment}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 text-center py-4">Sé el primero en comentar este diseño</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      {/* Modals */}
      <ReserveModal
        isOpen={showReserveModal}
        onClose={() => setShowReserveModal(false)}
        onSuccess={() => setShowPaymentModal(true)}
        design={design}
      />

      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        type={design.hasReachedGoal ? "buy" : "reserve"}
        amount={design.price}
      />
    </div>
  );
}