"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import Image from "next/image"

interface EditDesignModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (design: any) => void
  design: any
}

export function EditDesignModal({ isOpen, onClose, onSave, design }: EditDesignModalProps) {
  const [editedDesign, setEditedDesign] = useState(design || {})

  if (!design) return null

  const handleChange = (field: string, value: string | number) => {
    setEditedDesign((prev: any) => ({ ...prev, [field]: value }))
  }

  const handleSave = () => {
    onSave(editedDesign)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Editar Diseño</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Side - Image */}
          <div>
            <Image
              src={design.image || "/placeholder.svg"}
              alt={design.title}
              width={200}
              height={250}
              className="w-full h-auto rounded-lg object-cover"
            />
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Me gusta:</span>
                <span className="font-medium">{design.likes}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Meta:</span>
                <span className="font-medium">{design.goal}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Estado:</span>
                <span className={`font-medium ${design.hasReachedGoal ? "text-green-600" : "text-orange-500"}`}>
                  {design.hasReachedGoal ? "Meta alcanzada" : "En progreso"}
                </span>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Nombre del Diseño</Label>
              <Input
                id="title"
                value={editedDesign.title || ""}
                onChange={(e) => handleChange("title", e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                value={editedDesign.description || ""}
                onChange={(e) => handleChange("description", e.target.value)}
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="designer">Diseñador</Label>
              <Input
                id="designer"
                value={editedDesign.designer || ""}
                onChange={(e) => handleChange("designer", e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="price">Precio (S/)</Label>
              <Input
                id="price"
                type="number"
                value={editedDesign.price || ""}
                onChange={(e) => handleChange("price", Number.parseFloat(e.target.value))}
                disabled
              />
              <p className="text-xs text-gray-500 mt-1">El precio es establecido por la plataforma</p>
            </div>

            <div className="flex space-x-3 pt-4">
              <Button variant="outline" onClick={onClose} className="flex-1">
                Cancelar
              </Button>
              <Button onClick={handleSave} className="flex-1 bg-[#905ce6] hover:bg-[#3c2269]">
                Guardar
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
