"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { userProfile } from "@/lib/data"
import { Edit } from "lucide-react"

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    username: userProfile.username,
    name: userProfile.name,
    lastName: userProfile.lastName,
    bio: userProfile.bio,
    socialMedia: userProfile.socialMedia,
    avatar: userProfile.avatar,
  })

  const handleChange = (field: string, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }))
  }

  const handleSave = () => {
    // En una aplicación real, aquí guardaríamos los datos en la base de datos
    console.log("Guardando perfil:", profile)
    // Redirigir a la página de cuenta
    window.location.href = "/account"
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="p-4">
        <Link href="/account" className="inline-flex items-center text-gray-800">
          <ArrowLeft className="w-6 h-6 mr-2" />
        </Link>
      </header>

      {/* Profile Form */}
      <div className="max-w-md mx-auto p-6">
        <div className="flex items-center justify-center mb-8">
          <div className="relative">
            <Image
              src={profile.avatar || "/placeholder.svg"}
              alt={profile.username}
              width={80}
              height={80}
              className="rounded-full"
            />
            <div className="absolute bottom-0 right-0">
              <Button variant="outline" size="icon" className="rounded-full w-8 h-8 bg-white">
                <Edit className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <div className="ml-4">
            <h1 className="text-xl font-bold">{profile.username}</h1>
            <Button variant="ghost" size="sm" className="text-sm p-0 h-auto">
              Editar
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
              <Input
                value={profile.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="bg-gray-100 border-0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Apellidos</label>
              <Input
                value={profile.lastName}
                onChange={(e) => handleChange("lastName", e.target.value)}
                className="bg-gray-100 border-0"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
            <Textarea
              value={profile.bio}
              onChange={(e) => handleChange("bio", e.target.value)}
              className="bg-gray-100 border-0"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Redes Sociales</label>
            <Input
              value={profile.socialMedia}
              onChange={(e) => handleChange("socialMedia", e.target.value)}
              className="bg-gray-100 border-0"
            />
          </div>

          <Button onClick={handleSave} className="w-full bg-[#1a0b2e] hover:bg-[#3c2269]">
            Save
          </Button>
        </div>
      </div>
    </div>
  )
}
