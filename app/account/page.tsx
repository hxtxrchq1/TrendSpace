"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Edit, Plus, Trash2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { collections, userProfile } from "@/lib/data"
import { EditDesignModal } from "@/components/edit-design-modal"
import { EditCollectionModal } from "@/components/edit-collection-modal"
import { AddCollectionModal } from "@/components/add-collection-modal"
import { AddDesignModal } from "@/components/add-design-modal"

export default function AccountPage() {
  const [showEditDesignModal, setShowEditDesignModal] = useState(false)
  const [showEditCollectionModal, setShowEditCollectionModal] = useState(false)
  const [showAddCollectionModal, setShowAddCollectionModal] = useState(false)
  const [showAddDesignModal, setShowAddDesignModal] = useState(false)
  const [selectedDesign, setSelectedDesign] = useState<any>(null)
  const [selectedCollection, setSelectedCollection] = useState<any>(null)
  const [userCollections, setUserCollections] = useState(collections)
  const [userDesigns, setUserDesigns] = useState<any[]>([])

  const handleEditDesign = (design: any) => {
    setSelectedDesign(design)
    setShowEditDesignModal(true)
  }

  const handleEditCollection = (collection: any) => {
    setSelectedCollection(collection)
    setShowEditCollectionModal(true)
  }

  const handleAddCollection = () => {
    setShowAddCollectionModal(true)
  }

  const handleAddDesign = (collectionId: number) => {
    setSelectedCollection(userCollections.find((c) => c.id === collectionId))
    setShowAddDesignModal(true)
  }

  const handleDeleteDesign = (designId: number, collectionId: number) => {
    const updatedCollections = userCollections.map((collection) => {
      if (collection.id === collectionId) {
        return {
          ...collection,
          designs: collection.designs.filter((design) => design.id !== designId),
        }
      }
      return collection
    })
    setUserCollections(updatedCollections)
  }

  const handleSaveDesign = (design: any) => {
    // Si el diseño ya existe, actualizarlo
    if (selectedDesign) {
      const updatedCollections = userCollections.map((collection) => {
        return {
          ...collection,
          designs: collection.designs.map((d) => (d.id === design.id ? design : d)),
        }
      })
      setUserCollections(updatedCollections)
    }
    setShowEditDesignModal(false)
  }

  const handleSaveCollection = (collection: any) => {
    const updatedCollections = userCollections.map((c) => (c.id === collection.id ? collection : c))
    setUserCollections(updatedCollections)
    setShowEditCollectionModal(false)
  }

  const handleCreateCollection = (name: string) => {
    const newCollection = {
      id: userCollections.length + 1,
      name,
      designs: [],
    }
    setUserCollections([...userCollections, newCollection])
    setShowAddCollectionModal(false)
  }

  const handleCreateDesign = (design: any) => {
    if (selectedCollection) {
      const newDesign = {
        ...design,
        id: Math.max(0, ...userCollections.flatMap((c) => c.designs.map((d) => d.id))) + 1,
        likes: 0,
        comments: 0,
        reservations: 0,
        hasReachedGoal: false,
        collection: selectedCollection.name,
      }

      const updatedCollections = userCollections.map((collection) => {
        if (collection.id === selectedCollection.id) {
          return {
            ...collection,
            designs: [...collection.designs, newDesign],
          }
        }
        return collection
      })

      setUserCollections(updatedCollections)
      setUserDesigns([...userDesigns, newDesign])
    }
    setShowAddDesignModal(false)
  }

  const handleSave = () => {
    console.log("Guardando perfil:", userProfile)
    window.location.href = "/account"
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-[#1a0b2e] p-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Link href="/explore">
            <ArrowLeft className="w-6 h-6 text-white" />
          </Link>
          <h1 className="text-white text-lg font-medium">TrendSpace</h1>
        </div>
        <div className="flex items-center space-x-4">
          <Link href="/design" className="text-white text-sm">
            DISEÑA TU MODELO
          </Link>
          <Image
            src={userProfile.avatar || "/placeholder.svg"}
            alt={userProfile.username}
            width={32}
            height={32}
            className="rounded-full"
          />
        </div>
      </header>

      {/* User Profile */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-8">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 uppercase">TUS DISEÑOS</h1>
          </div>
          <Button onClick={handleAddCollection} variant="ghost" size="icon" className="rounded-full">
            <Plus className="w-6 h-6" />
          </Button>
          <div className="flex items-center space-x-3">
            <Image
              src={userProfile.avatar || "/placeholder.svg"}
              alt={userProfile.username}
              width={40}
              height={40}
              className="rounded-full"
            />
            <div className="flex items-center">
              <span className="font-medium">{userProfile.username}</span>
              <Link href="/profile">
                <Button variant="ghost" size="icon" className="ml-1">
                  <Edit className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Collections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {userCollections.map((collection) => (
            <div key={collection.id} className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-bold text-lg">{collection.name}</h2>
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full"
                    onClick={() => handleAddDesign(collection.id)}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full"
                    onClick={() => handleEditCollection(collection)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <Card className="bg-gray-100 border-0">
                <CardContent className="p-4">
                  {collection.designs.length > 0 ? (
                    <div className="grid grid-cols-2 gap-2">
                      {collection.designs.map((design) => (
                        <div key={design.id} className="relative group cursor-pointer rounded-lg overflow-hidden">
                          <Image
                            src={design.image || "/placeholder.svg"}
                            alt={design.title}
                            width={150}
                            height={150}
                            className="w-full h-24 object-cover rounded-lg"
                            onClick={() => handleEditDesign(design)}
                          />
                          <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button
                              variant="destructive"
                              size="icon"
                              className="h-6 w-6"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleDeleteDesign(design.id, collection.id)
                              }}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <p>No hay diseños en esta colección</p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-2"
                        onClick={() => handleAddDesign(collection.id)}
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Añadir diseño
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Modals */}
      <EditDesignModal
        isOpen={showEditDesignModal}
        onClose={() => setShowEditDesignModal(false)}
        onSave={handleSaveDesign}
        design={selectedDesign}
      />

      <EditCollectionModal
        isOpen={showEditCollectionModal}
        onClose={() => setShowEditCollectionModal(false)}
        onSave={handleSaveCollection}
        collection={selectedCollection}
      />

      <AddCollectionModal
        isOpen={showAddCollectionModal}
        onClose={() => setShowAddCollectionModal(false)}
        onSave={handleCreateCollection}
      />

      <AddDesignModal
        isOpen={showAddDesignModal}
        onClose={() => setShowAddDesignModal(false)}
        onSave={handleCreateDesign}
        collection={selectedCollection}
      />
    </div>
  )
}
