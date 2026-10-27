import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Heart, Users, Zap, Star, CheckCircle, Shirt, Palette, TrendingUp } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#3c2269] to-[#905ce6] text-white">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold">TrendSpace</div>
          <nav className="hidden md:flex space-x-8">
            <a href="#features" className="hover:text-purple-200 transition-colors">
              Características
            </a>
            <a href="#how-it-works" className="hover:text-purple-200 transition-colors">
              Cómo Funciona
            </a>
            <a href="#testimonials" className="hover:text-purple-200 transition-colors">
              Testimonios
            </a>
          </nav>
          <Link href="/">
            <Button variant="secondary" className="bg-white text-[#3c2269] hover:bg-gray-100">
              Ir a la App
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#3c2269] via-[#482880] to-[#27164e] text-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Donde la <span className="text-[#905ce6]">Creatividad</span> se Convierte en{" "}
                <span className="text-[#905ce6]">Realidad</span>
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed">
                TrendSpace es la plataforma que conecta diseñadores independientes con amantes de la moda. Descubre
                diseños únicos, apoya a creadores y obtén prendas exclusivas que no encontrarás en ningún otro lugar.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/">
                  <Button size="lg" className="bg-[#905ce6] hover:bg-[#7c4ddb] text-white px-8 py-4 text-lg">
                    Explorar Diseños
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link href="/design">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-[#3c2269] px-8 py-4 text-lg"
                  >
                    Crear Diseño
                    <Palette className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>
              <div className="flex items-center space-x-8 pt-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#905ce6]">500+</div>
                  <div className="text-sm text-gray-300">Diseños Únicos</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#905ce6]">1000+</div>
                  <div className="text-sm text-gray-300">Usuarios Activos</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#905ce6]">50+</div>
                  <div className="text-sm text-gray-300">Diseñadores</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                <div className="grid grid-cols-2 gap-4">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/design-1.jpg-lBWnOyx7lnOHOYQVWI8Cd5SvFSAerD.jpeg"
                    alt="Diseño 1"
                    width={200}
                    height={250}
                    className="rounded-lg object-cover h-40"
                  />
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/design-37.jpg-SZrnP8bH6b2kWIYaGGH1PwDhxK8OrM.jpeg"
                    alt="Diseño 2"
                    width={200}
                    height={250}
                    className="rounded-lg object-cover h-40"
                  />
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/design-17.jpg-ePeyjpdNiX3IzqDl3zMjupM7vi4mKh.jpeg"
                    alt="Diseño 3"
                    width={200}
                    height={250}
                    className="rounded-lg object-cover h-40"
                  />
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/design-40.jpg-7cjlHaLHyxem5TbL7gR7bheCkdMDgM.jpeg"
                    alt="Diseño 4"
                    width={200}
                    height={250}
                    className="rounded-lg object-cover h-40"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">¿Por qué elegir TrendSpace?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Somos más que una plataforma de moda. Somos una comunidad que valida, produce y distribuye los mejores
              diseños del mundo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-[#905ce6] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Validación Social</h3>
                <p className="text-gray-600">
                  Los diseños se producen solo cuando alcanzan suficientes "me gusta", garantizando que solo los mejores
                  lleguen al mercado.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-[#905ce6] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Comunidad Creativa</h3>
                <p className="text-gray-600">
                  Conecta con diseñadores independientes y otros amantes de la moda en una comunidad vibrante y
                  colaborativa.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-[#905ce6] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Producción Bajo Demanda</h3>
                <p className="text-gray-600">
                  Sin inventario, sin desperdicio. Producimos solo lo que la comunidad realmente quiere, cuando lo
                  quiere.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-[#905ce6] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Shirt className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Diseños Exclusivos</h3>
                <p className="text-gray-600">
                  Cada prenda es única y limitada. No encontrarás estos diseños en tiendas convencionales.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-[#905ce6] rounded-full flex items-center justify-center mx-auto mb-6">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Ganancias para Creadores</h3>
                <p className="text-gray-600">
                  Los diseñadores reciben comisiones por cada venta, incentivando la creatividad y la innovación.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-[#905ce6] rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Garantía de Calidad</h3>
                <p className="text-gray-600">
                  Nos encargamos de toda la producción, logística y entrega para garantizar la mejor experiencia.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Cómo Funciona</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Un proceso simple que transforma ideas creativas en productos reales
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-[#905ce6] rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Descubre y Apoya</h3>
              <p className="text-gray-600">
                Explora diseños únicos creados por diseñadores independientes. Dale "me gusta" a tus favoritos y
                compártelos con la comunidad.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-[#905ce6] rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Reserva o Compra</h3>
              <p className="text-gray-600">
                Reserva diseños que aún no han alcanzado su meta o compra directamente los que ya están disponibles.
                Solo pagas cuando se produce.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-[#905ce6] rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Recibe tu Prenda</h3>
              <p className="text-gray-600">
                Una vez que el diseño alcanza su meta, lo producimos con la mejor calidad y te lo enviamos directamente
                a tu puerta.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Lo que dicen nuestros usuarios</h2>
            <p className="text-xl text-gray-600">Historias reales de nuestra comunidad</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6">
                  "TrendSpace me ha permitido encontrar prendas únicas que realmente reflejan mi personalidad. ¡Es
                  increíble ser parte de la decisión de qué se produce!"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-[#905ce6] rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold">M</span>
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">María González</div>
                    <div className="text-gray-500">Compradora</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6">
                  "Como diseñador independiente, TrendSpace me ha dado la oportunidad de monetizar mis creaciones sin
                  preocuparme por la producción o logística."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-[#905ce6] rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold">C</span>
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">Carlos Rivera</div>
                    <div className="text-gray-500">Diseñador</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6">
                  "La calidad de las prendas es excepcional y el proceso de reserva es muy transparente. Sé exactamente
                  qué esperar y cuándo."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-[#905ce6] rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold">A</span>
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">Ana Martínez</div>
                    <div className="text-gray-500">Compradora</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#3c2269] to-[#905ce6] text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">¿Listo para unirte a la revolución de la moda?</h2>
          <p className="text-xl mb-8 text-purple-100">
            Descubre diseños únicos, apoya a creadores independientes y obtén prendas exclusivas que no encontrarás en
            ningún otro lugar.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button size="lg" className="bg-white text-[#3c2269] hover:bg-gray-100 px-8 py-4 text-lg">
                Explorar Diseños
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/design">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-[#3c2269] px-8 py-4 text-lg"
              >
                Crear tu Primer Diseño
                <Palette className="w-5 h-5 ml-2" />
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
              <div className="text-2xl font-bold mb-4">TrendSpace</div>
              <p className="text-gray-400">
                La plataforma que conecta creatividad con comunidad para crear moda única y sostenible.
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-4">Producto</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/" className="hover:text-white transition-colors">
                    Explorar Diseños
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
