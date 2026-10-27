"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import { Trash2 } from "lucide-react"

interface EditCollectionModalProps {
  isOpen: boolean
  onClose: () => void
  collection: any
}

export function EditCollectionModal({ isOpen, onClose, collection }: EditCollectionModalProps) {
  const [editedCollection, setEditedCollection] = useState(collection || { name: "", designs: [] })

  if (!collection) return null

  const handleChange = (field: string, value: string) => {
    setEditedCollection((prev: any) => ({ ...prev, [field]: value }))
  }

  const handleSave = () => {
    // En una aplicación real, aquí guardaríamos los cambios en la base de datos
    console.log("Guardando colección:", editedCollection)
    onClose()
  }

  const handleRemoveDesign = (designId: number) => {
    setEditedCollection((prev: any) => ({
      ...prev,
      designs: prev.designs.filter((d: any) => d.id !== designId),
    }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Editar Colección</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div>
            <Label htmlFor="name">Nombre de la Colección</Label>
            <Input
              id="name"
              value={editedCollection.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label>Diseños en esta colección</Label>
            <div className="mt-3 space-y-3">
              {collection.designs.map((design: any) => (
                <div key={design.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Image
                      src={design.image || "/placeholder.svg"}
                      alt={design.title}
                      width={50}
                      height={50}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div>
                      <p className="font-medium">{design.title}</p>
                      <p className="text-sm text-gray-500">S/ {design.price}</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleRemoveDesign(design.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
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
      </DialogContent>
    </Dialog>
  )
}
