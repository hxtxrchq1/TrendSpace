"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface AddCollectionModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (name: string) => void
}

export function AddCollectionModal({ isOpen, onClose, onSave }: AddCollectionModalProps) {
  const [collectionName, setCollectionName] = useState("")

  const handleSave = () => {
    if (!collectionName.trim()) return
    onSave(collectionName)
    setCollectionName("")
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Nueva Colección</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div>
            <Label htmlFor="name">Nombre de la Colección</Label>
            <Input
              id="name"
              value={collectionName}
              onChange={(e) => setCollectionName(e.target.value)}
              placeholder="Ej: Verano 2024"
              className="mt-1"
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancelar
            </Button>
            <Button onClick={handleSave} className="flex-1 bg-[#905ce6] hover:bg-[#3c2269]">
              Crear
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
