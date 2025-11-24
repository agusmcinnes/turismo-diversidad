"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import type { TravelPackage } from "@/types/travel-package"
import { deletePackageImageByUrl } from "@/lib/supabase/storage"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Package, Users, Calendar, LogOut } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import PackageModal from "./package-modal"

export default function AdminDashboard() {
  const [packages, setPackages] = useState<TravelPackage[]>([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingPackage, setEditingPackage] = useState<TravelPackage | null>(null)
  const router = useRouter()

  useEffect(() => {
    async function fetchData() {
      const supabase = createClient()

      // Get user
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)

      // Fetch packages
      const { data, error } = await supabase
        .from("travel_packages")
        .select("*")
        .order("created_at", { ascending: false })

      if (error) {
        console.error("Error fetching packages:", error)
      } else {
        setPackages(data || [])
      }
      setLoading(false)
    }

    fetchData()
  }, [])

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/auth/login")
  }

  const handleCreatePackage = () => {
    setEditingPackage(null)
    setIsModalOpen(true)
  }

  const handleEditPackage = (pkg: TravelPackage) => {
    setEditingPackage(pkg)
    setIsModalOpen(true)
  }

  const handleSavePackage = (savedPackage: TravelPackage) => {
    if (editingPackage) {
      setPackages(packages.map((pkg) => (pkg.id === savedPackage.id ? savedPackage : pkg)))
    } else {
      setPackages([savedPackage, ...packages])
    }
  }

  const handleDeletePackage = async (id: string) => {
    if (!confirm("¿Estás seguro de que quieres eliminar este paquete?")) return

    const supabase = createClient()

    try {
      // Obtener el paquete para verificar si tiene imagen
      const packageToDelete = packages.find((pkg) => pkg.id === id)

      // Eliminar el registro de la base de datos
      const { error } = await supabase.from("travel_packages").delete().eq("id", id)

      if (error) {
        throw error
      }

      // Si el paquete tiene una imagen en Supabase Storage, eliminarla
      if (packageToDelete?.image_url) {
        try {
          await deletePackageImageByUrl(packageToDelete.image_url)
        } catch (imageError) {
          console.error("Error deleting image:", imageError)
          // Continuar aunque falle la eliminación de la imagen
        }
      }

      setPackages(packages.filter((pkg) => pkg.id !== id))
    } catch (error) {
      console.error("Error deleting package:", error)
      alert("Error al eliminar el paquete")
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando panel de administración...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Image src="/images/logo.png" alt="Turismo Diversidad" width={120} height={40} className="mr-4" />
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Panel de Administración</h1>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">Bienvenido, {user?.email}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="flex items-center gap-2 bg-transparent"
              >
                <LogOut className="w-4 h-4" />
                Cerrar Sesión
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Paquetes</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{packages.length}</div>
              <p className="text-xs text-muted-foreground">Paquetes de viaje activos</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Excursiones</CardTitle>
              <Calendar className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {packages.filter(pkg => pkg.type === 'excursion').length}
              </div>
              <p className="text-xs text-muted-foreground">Excursiones disponibles</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Paquetes de Viaje</CardTitle>
              <Users className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">
                {packages.filter(pkg => pkg.type === 'paquete_viaje').length}
              </div>
              <p className="text-xs text-muted-foreground">Paquetes completos</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Promedio Duración</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {packages.length > 0
                  ? Math.round(packages.reduce((acc, pkg) => acc + pkg.duration_days, 0) / packages.length)
                  : 0}{" "}
                días
              </div>
              <p className="text-xs text-muted-foreground">Duración promedio</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Paquetes de Viaje</h2>
          <Button onClick={handleCreatePackage} className="bg-green-600 hover:bg-green-700 flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Nuevo Paquete
          </Button>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages.map((pkg) => (
            <Card key={pkg.id} className="overflow-hidden p-0">
              <div className="relative h-48">
                <Image
                  src={pkg.image_url || "/placeholder.svg?height=300&width=400&query=esteros del ibera"}
                  alt={pkg.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-2 left-2 right-2">
                  <h3 className="text-white font-semibold text-lg truncate">{pkg.name}</h3>
                  <p className="text-white/90 text-sm truncate">{pkg.destination}</p>
                </div>
                <div className="absolute top-2 left-2">
                  <Badge 
                    variant="secondary" 
                    className={`${pkg.type === 'excursion' ? 'bg-blue-600 text-white' : 'bg-purple-600 text-white'}`}
                  >
                    {pkg.type === 'excursion' ? 'Excursión' : 'Paquete de Viaje'}
                  </Badge>
                </div>
                {pkg.price && (
                  <Badge className="absolute top-2 right-2 bg-green-600">${pkg.price.toLocaleString()}</Badge>
                )}
              </div>

              <CardContent className="p-4">
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{pkg.description}</p>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span>
                    {pkg.duration_days} días, {pkg.duration_nights} noches
                  </span>
                  <span>{pkg.services.length} servicios</span>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 flex items-center gap-1 bg-transparent"
                    onClick={() => handleEditPackage(pkg)}
                  >
                    <Edit className="w-3 h-3" />
                    Editar
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1 text-red-600 border-red-200 hover:bg-red-50 bg-transparent"
                    onClick={() => handleDeletePackage(pkg.id)}
                  >
                    <Trash2 className="w-3 h-3" />
                    Eliminar
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {packages.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Package className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No hay paquetes</h3>
              <p className="text-gray-600 mb-4">Comienza creando tu primer paquete de viaje</p>
              <Button onClick={handleCreatePackage} className="bg-green-600 hover:bg-green-700">
                <Plus className="w-4 h-4 mr-2" />
                Crear Primer Paquete
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      <PackageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSavePackage}
        editingPackage={editingPackage}
      />
    </div>
  )
}
