"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Heart, CheckCircle, Shirt, Palette, DollarSign, Award, Target } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function LandingPage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  const featuredDesigns = [
    {
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/design-1.jpg-lBWnOyx7lnOHOYQVWI8Cd5SvFSAerD.jpeg",
      title: "Official Man Tee",
      likes: 245,
      goal: 300,
      price: 120,
    },
    {
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/design-37.jpg-SZrnP8bH6b2kWIYaGGH1PwDhxK8OrM.jpeg",
      title: "Vintage Plaid Corset",
      likes: 389,
      goal: 400,
      price: 180,
    },
    {
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/design-17.jpg-ePeyjpdNiX3IzqDl3zMjupM7vi4mKh.jpeg",
      title: "Purple Angel Hoodie",
      likes: 187,
      goal: 250,
      price: 160,
    },
  ]

  useEffect(() => {
    setIsVisible(true)
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredDesigns.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-[#3c2269] to-[#905ce6] bg-clip-text text-transparent">
            TrendSpace
          </div>
          <nav className="hidden md:flex space-x-8">
            <a href="#how-it-works" className="text-gray-600 hover:text-[#905ce6] transition-colors font-medium">
              Cómo Funciona
            </a>
            <a href="#earnings" className="text-gray-600 hover:text-[#905ce6] transition-colors font-medium">
              Ganancias
            </a>
            <a href="#process" className="text-gray-600 hover:text-[#905ce6] transition-colors font-medium">
              Nuestro Proceso
            </a>
          </nav>
          <Link href="/explore">
            <Button className="bg-[#905ce6] hover:bg-[#7c4ddb] text-white">
              Explorar Diseños
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f8f9ff] via-white to-[#f3f0ff]">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div
              className={`space-y-8 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              <div className="space-y-6">
                <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-[#3c2269] to-[#905ce6] bg-clip-text text-transparent">
                    Creatividad
                  </span>
                  <br />
                  que se convierte en
                  <br />
                  <span className="bg-gradient-to-r from-[#905ce6] to-[#3c2269] bg-clip-text text-transparent">
                    Realidad
                  </span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                  La primera plataforma donde la comunidad decide qué diseños se producen.
                  <span className="font-semibold text-[#905ce6]"> Descubre, vota y obtén prendas únicas</span> que no
                  encontrarás en ningún otro lugar.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/explore">
                  <Button size="lg" className="bg-[#905ce6] hover:bg-[#7c4ddb] text-white px-8 py-4 text-lg group">
                    Ver Diseños
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/design">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-[#905ce6] text-[#905ce6] hover:bg-[#905ce6] hover:text-white px-8 py-4 text-lg group bg-white/80 backdrop-blur-sm"
                  >
                    <Palette className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                    Crear Diseño
                  </Button>
                </Link>
              </div>

              <div className="flex items-center space-x-8 pt-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#905ce6]">500+</div>
                  <div className="text-sm text-gray-500">Diseños Únicos</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#905ce6]">1K+</div>
                  <div className="text-sm text-gray-500">Usuarios Activos</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#905ce6]">50+</div>
                  <div className="text-sm text-gray-500">Diseñadores</div>
                </div>
              </div>
            </div>

            {/* Dynamic Design Showcase */}
            <div
              className={`relative transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
            >
              <div className="relative w-full h-[600px] bg-gradient-to-br from-[#905ce6]/10 to-[#3c2269]/10 rounded-3xl p-8 overflow-hidden">
                {featuredDesigns.map((design, index) => (
                  <div
                    key={index}
                    className={`absolute inset-8 transition-all duration-700 ${
                      index === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-95"
                    }`}
                  >
                    <div className="bg-white rounded-2xl shadow-2xl p-6 h-full flex flex-col">
                      <Image
                        src={design.image || "/placeholder.svg"}
                        alt={design.title}
                        width={400}
                        height={300}
                        className="w-full h-64 object-cover rounded-xl mb-4"
                      />
                      <div className="flex-1 space-y-4">
                        <h3 className="text-xl font-bold text-gray-900">{design.title}</h3>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Progreso</span>
                            <span className="font-medium">
                              {design.likes}/{design.goal} likes
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-[#905ce6] to-[#3c2269] h-2 rounded-full transition-all duration-1000"
                              style={{ width: `${(design.likes / design.goal) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                        <div className="flex justify-between items-center pt-2">
                          <span className="text-2xl font-bold text-[#905ce6]">S/ {design.price}</span>
                          <div className="flex items-center space-x-1 text-red-500">
                            <Heart className="w-4 h-4 fill-current" />
                            <span className="font-medium">{design.likes}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Slide indicators */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {featuredDesigns.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentSlide ? "bg-[#905ce6] w-6" : "bg-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">¿Cómo Funciona TrendSpace?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Un proceso simple y transparente que conecta creatividad con comunidad
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-[#905ce6] to-[#3c2269] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">1. Descubre y Vota</h3>
                <p className="text-gray-600">
                  Explora diseños únicos creados por diseñadores independientes. Dale "me gusta" a tus favoritos para
                  ayudarlos a alcanzar su meta de producción.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-[#905ce6] to-[#3c2269] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">2. Reserva o Compra</h3>
                <p className="text-gray-600">
                  Reserva diseños que aún no han alcanzado su meta o compra directamente los que ya están disponibles.
                  Solo pagas cuando se confirma la producción.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-[#905ce6] to-[#3c2269] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Shirt className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">3. Recibe tu Prenda</h3>
                <p className="text-gray-600">
                  Una vez que el diseño alcanza su meta, lo producimos con la mejor calidad y te lo enviamos
                  directamente a tu puerta en 3-5 días hábiles.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-[#905ce6] to-[#3c2269] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Palette className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">4. Crea tus Diseños</h3>
                <p className="text-gray-600">
                  ¿Eres creativo? Sube tus propios diseños a la plataforma y permite que la comunidad los vote. Si
                  alcanzan la meta, ¡gana comisiones por cada venta!
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Video explicativo */}
          <div className="mt-16">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Mira cómo funciona en acción</h3>
              <p className="text-lg text-gray-600">
                Descubre paso a paso cómo crear, votar y obtener diseños únicos en TrendSpace
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                <iframe
                  className="absolute top-0 left-0 w-full h-full rounded-xl shadow-2xl"
                  src="https://www.youtube.com/embed/o8fn2aN-oZA"
                  title="Cómo funciona TrendSpace"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Earnings Section */}
      <section id="earnings" className="py-20 bg-gradient-to-br from-[#f8f9ff] to-[#f3f0ff]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">¿Cómo Ganas en TrendSpace?</h2>
            <p className="text-xl text-gray-600">Beneficios reales para toda la comunidad</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Para Usuarios/Compradores */}
            <Card className="border-0 shadow-xl bg-white">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                    <DollarSign className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Para Compradores</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900">Prendas Exclusivas</p>
                      <p className="text-gray-600 text-sm">
                        Acceso a diseños únicos que no encontrarás en tiendas convencionales
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900">Precios Justos</p>
                      <p className="text-gray-600 text-sm">Sin intermediarios, precios directos del diseñador a ti</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900">Garantía de Devolución</p>
                      <p className="text-gray-600 text-sm">
                        Si un diseño no alcanza su meta, te devolvemos el 100% de tu dinero
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900">Influencia en la Moda</p>
                      <p className="text-gray-600 text-sm">Tu voto decide qué diseños se convierten en realidad</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Para Diseñadores */}
            <Card className="border-0 shadow-xl bg-white">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                    <Award className="w-6 h-6 text-[#905ce6]" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Para Diseñadores</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900">Comisiones del 15-25%</p>
                      <p className="text-gray-600 text-sm">Gana por cada venta de tus diseños que alcancen la meta</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900">Sin Inversión Inicial</p>
                      <p className="text-gray-600 text-sm">
                        No necesitas capital para producir, nosotros nos encargamos
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900">Exposición Global</p>
                      <p className="text-gray-600 text-sm">Tu trabajo llega a miles de usuarios potenciales</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900">Feedback Directo</p>
                      <p className="text-gray-600 text-sm">Recibe comentarios y validación de la comunidad</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Process Section */}
      <section id="process" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Nuestro Proceso con Diseños Exitosos</h2>
            <p className="text-xl text-gray-600">Qué hacemos cuando un diseño alcanza su meta de likes</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-[#905ce6] to-[#3c2269] rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Validación Alcanzada</h3>
              <p className="text-gray-600 text-sm">
                El diseño alcanza su meta de likes y se confirma la demanda de la comunidad.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-[#905ce6] to-[#3c2269] rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Producción Inmediata</h3>
              <p className="text-gray-600 text-sm">
                Iniciamos la producción con nuestros socios manufactureros de alta calidad.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-[#905ce6] to-[#3c2269] rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Pago a Diseñadores</h3>
              <p className="text-gray-600 text-sm">
                El diseñador recibe su comisión del 15-25% por cada unidad vendida.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-[#905ce6] to-[#3c2269] rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">4</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Entrega Global</h3>
              <p className="text-gray-600 text-sm">
                Nos encargamos de toda la logística y entrega directa a los compradores.
              </p>
            </div>
          </div>

          <div className="mt-16 bg-gradient-to-r from-[#905ce6]/10 to-[#3c2269]/10 rounded-2xl p-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">💡 Nuestro Compromiso</h3>
              <p className="text-lg text-gray-700 max-w-4xl mx-auto">
                <span className="font-semibold">TrendSpace se encarga de todo:</span> producción, control de calidad,
                logística, atención al cliente y devoluciones. Los diseñadores solo se enfocan en crear, mientras
                nosotros convertimos sus ideas en productos reales y rentables.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#3c2269] to-[#905ce6] text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">¿Listo para ser parte de la revolución?</h2>
          <p className="text-xl mb-8 text-purple-100">
            Únete a una comunidad que está redefiniendo cómo se crea y consume la moda
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/explore">
              <Button size="lg" className="bg-white text-[#3c2269] hover:bg-gray-100 px-8 py-4 text-lg group">
                Explorar Diseños
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/design">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-[#3c2269] px-8 py-4 text-lg group bg-white/20 backdrop-blur-sm"
              >
                <Palette className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                Subir tu Diseño
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="text-2xl font-bold mb-4 bg-gradient-to-r from-[#905ce6] to-[#3c2269] bg-clip-text text-transparent">
                TrendSpace
              </div>
              <p className="text-gray-400">
                La plataforma que conecta creatividad con comunidad para crear moda única y sostenible.
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-4">Explora</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/explore" className="hover:text-white transition-colors">
                    Todos los Diseños
                  </Link>
                </li>
                <li>
                  <Link href="/design" className="hover:text-white transition-colors">
                    Crear Diseño
                  </Link>
                </li>
                <li>
                  <Link href="/account" className="hover:text-white transition-colors">
                    Mi Cuenta
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Comunidad</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Diseñadores
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Eventos
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Soporte</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Centro de Ayuda
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contacto
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Términos y Condiciones
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 TrendSpace. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
