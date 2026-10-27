"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image"

interface AddDesignModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (design: any) => void
  collection: any
}

export function AddDesignModal({ isOpen, onClose, onSave, collection }: AddDesignModalProps) {
  const [newDesign, setNewDesign] = useState({
    title: "",
    description: "",
    designer: "",
    price: 120,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/design-1.jpg-lBWnOyx7lnOHOYQVWI8Cd5SvFSAerD.jpeg", // Imagen predeterminada
    goal: 300,
  })

  const availableImages = [
    {
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/design-1.jpg-lBWnOyx7lnOHOYQVWI8Cd5SvFSAerD.jpeg",
      name: "Angel Design",
    },
    {
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/design-37.jpg-SZrnP8bH6b2kWIYaGGH1PwDhxK8OrM.jpeg",
      name: "Plaid Corset",
    },
    {
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/design-3.jpg-e4zq3AG5pzLWXxeaTecWaCOGJh8Gs0.jpeg",
      name: "Brown Lace",
    },
    {
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/design-4.jpg-wkRKFJXsIJmg4RqS8sEKPvC43N4tk7.jpeg",
      name: "Denim Skirt",
    },
    {
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/design-17.jpg-ePeyjpdNiX3IzqDl3zMjupM7vi4mKh.jpeg",
      name: "Purple Hoodie",
    },
    {
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/design-40.jpg-7cjlHaLHyxem5TbL7gR7bheCkdMDgM.jpeg",
      name: "Graffiti Pants",
    },
  ]

  if (!collection) return null

  const handleChange = (field: string, value: string | number) => {
    setNewDesign((prev) => ({ ...prev, [field]: value }))
  }

  const handleSave = () => {
    if (!newDesign.title.trim()) return
    onSave(newDesign)
    setNewDesign({
      title: "",
      description: "",
      designer: "",
      price: 120,
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/design-1.jpg-lBWnOyx7lnOHOYQVWI8Cd5SvFSAerD.jpeg",
      goal: 300,
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Añadir Diseño a {collection?.name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="title">Nombre del Diseño</Label>
            <Input
              id="title"
              value={newDesign.title}
              onChange={(e) => handleChange("title", e.target.value)}
              placeholder="Ej: Vintage Summer Tee"
            />
          </div>

          <div>
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              value={newDesign.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Describe tu diseño..."
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="designer">Diseñador</Label>
            <Input
              id="designer"
              value={newDesign.designer}
              onChange={(e) => handleChange("designer", e.target.value)}
              placeholder="Tu nombre o seudónimo"
            />
          </div>

          <div>
            <Label htmlFor="price">Precio Sugerido (S/)</Label>
            <Input
              id="price"
              type="number"
              value={newDesign.price}
              onChange={(e) => handleChange("price", Number.parseFloat(e.target.value))}
              placeholder="120"
            />
            <p className="text-xs text-gray-500 mt-1">El precio final será establecido por la plataforma</p>
          </div>

          <div>
            <Label htmlFor="image">Imagen</Label>
            <Select value={newDesign.image} onValueChange={(value) => handleChange("image", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona una imagen" />
              </SelectTrigger>
              <SelectContent>
                {availableImages.map((img) => (
                  <SelectItem key={img.url} value={img.url}>
                    <div className="flex items-center">
                      <div className="w-8 h-8 mr-2 overflow-hidden rounded">
                        <Image
                          src={img.url || "/placeholder.svg"}
                          alt={img.name}
                          width={32}
                          height={32}
                          className="object-cover"
                        />
                      </div>
                      <span>{img.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="pt-2">
            <Label>Vista previa</Label>
            <div className="mt-2 border rounded-lg p-4 flex justify-center">
              <Image
                src={newDesign.image || "/placeholder.svg"}
                alt="Vista previa"
                width={150}
                height={150}
                className="h-40 object-contain"
              />
            </div>
          </div>

          <div className="flex space-x-3 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancelar
            </Button>
            <Button onClick={handleSave} className="flex-1 bg-[#905ce6] hover:bg-[#3c2269]">
              Añadir Diseño
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
