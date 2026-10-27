"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CreditCard, Smartphone } from "lucide-react"

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  type: "reserve" | "buy"
  amount: number
}

const countries = ["Perú", "Argentina", "Chile", "Colombia", "México", "España", "Estados Unidos"]

export function PaymentModal({ isOpen, onClose, type, amount }: PaymentModalProps) {
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [showSuccess, setShowSuccess] = useState(false)
  const [formData, setFormData] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
    cardName: "",
  })

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handlePayment = () => {
    // Simular procesamiento de pago
    setShowSuccess(true)
    setTimeout(() => {
      setShowSuccess(false)
      onClose()
    }, 5000)
  }

  if (showSuccess) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md">
          <div className="bg-gradient-to-br from-[#3c2269] via-[#482880] to-[#27164e] text-white p-8 rounded-lg text-center space-y-6">
            <h2 className="text-2xl font-bold">
              {type === "reserve" ? "¡Recibimos tu solicitud de Reserva!" : "¡Recibimos tu solicitud de compra!"}
            </h2>

            <p className="text-sm opacity-90">Te enviaremos los detalles y avances a tu correo.</p>

            {/* Warning Message */}
            <div className="bg-yellow-500/20 border border-yellow-400/30 rounded-lg p-3 text-sm">
              <p className="font-medium">⚠️</p>
              <p>
                {type === "reserve"
                  ? "El cobro final solo se realiza si el diseño alcanza su meta de 'me gusta'. Si no se alcanza la meta, el dinero reservado será devuelto"
                  : "Tu producto ya está en producción y disponible para compra inmediata. Envío en 3-5 días hábiles una vez confirmado el pago."}
              </p>
            </div>

            {/* Progress Steps */}
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <div className="text-center flex-1">
                  <div className="w-8 h-8 bg-[#905ce6] rounded-full flex items-center justify-center mx-auto mb-1 text-white font-bold">
                    1
                  </div>
                  <p className="opacity-75">{type === "reserve" ? "En espera de la Reserva" : "En preparación"}</p>
                </div>

                <div className="flex-1 h-px bg-white/30 mx-2"></div>

                <div className="text-center flex-1">
                  <div className="w-8 h-8 bg-white/30 rounded-full flex items-center justify-center mx-auto mb-1 text-white font-bold">
                    2
                  </div>
                  <p className="opacity-75">En camino</p>
                </div>

                <div className="flex-1 h-px bg-white/30 mx-2"></div>

                <div className="text-center flex-1">
                  <div className="w-8 h-8 bg-white/30 rounded-full flex items-center justify-center mx-auto mb-1 text-white font-bold">
                    3
                  </div>
                  <p className="opacity-75">Entregado</p>
                </div>
              </div>
            </div>

            <Button
              onClick={() => (window.location.href = "/explore")}
              className="w-full bg-[#905ce6] hover:bg-[#7c4ddb] text-white"
            >
              Regresar a Explorar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center">Pasarela de Pago</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="text-center">
            <p className="text-2xl font-bold text-[#905ce6]">S/ {amount}</p>
            <p className="text-gray-600">{type === "reserve" ? "Reserva del diseño" : "Compra del diseño"}</p>
          </div>

          {/* Payment Methods */}
          <div>
            <Label className="text-base font-medium">Método de Pago</Label>
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="mt-3">
              <div className="flex items-center space-x-2 p-3 border rounded-lg">
                <RadioGroupItem value="card" id="card" />
                <CreditCard className="w-5 h-5" />
                <Label htmlFor="card">Tarjeta de Crédito/Débito</Label>
              </div>
              <div className="flex items-center space-x-2 p-3 border rounded-lg">
                <RadioGroupItem value="yape" id="yape" />
                <Smartphone className="w-5 h-5" />
                <Label htmlFor="yape">Yape</Label>
              </div>
              <div className="flex items-center space-x-2 p-3 border rounded-lg">
                <RadioGroupItem value="plin" id="plin" />
                <Smartphone className="w-5 h-5" />
                <Label htmlFor="plin">Plin</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Card Details */}
          {paymentMethod === "card" && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="cardNumber">Número de Tarjeta</Label>
                <Input
                  id="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  value={formData.cardNumber}
                  onChange={(e) => handleChange("cardNumber", e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="expiry">Vencimiento</Label>
                  <Input
                    id="expiry"
                    placeholder="MM/AA"
                    value={formData.expiry}
                    onChange={(e) => handleChange("expiry", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="cvv">CVV</Label>
                  <Input
                    id="cvv"
                    placeholder="123"
                    value={formData.cvv}
                    onChange={(e) => handleChange("cvv", e.target.value)}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="cardName">Nombre en la Tarjeta</Label>
                <Input
                  id="cardName"
                  placeholder="Nombre completo"
                  value={formData.cardName}
                  onChange={(e) => handleChange("cardName", e.target.value)}
                />
              </div>
            </div>
          )}

          {/* Mobile Payment Info */}
          {(paymentMethod === "yape" || paymentMethod === "plin") && (
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">
                Serás redirigido a la aplicación {paymentMethod === "yape" ? "Yape" : "Plin"} para completar el pago.
              </p>
            </div>
          )}

          <div className="flex space-x-3 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancelar
            </Button>
            <Button onClick={handlePayment} className="flex-1 bg-[#905ce6] hover:bg-[#3c2269] text-white">
              Pagar S/ {amount}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
