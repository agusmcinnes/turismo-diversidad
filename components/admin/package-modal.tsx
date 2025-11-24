"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import type { TravelPackage, CreateTravelPackageData, PackageType } from "@/types/travel-package"
import { uploadPackageImage, updatePackageImage, validateImageFile, isSupabaseStorageUrl } from "@/lib/supabase/storage"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { X, Plus, Upload, Image as ImageIcon } from "lucide-react"

interface PackageModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (packageData: TravelPackage) => void
  editingPackage?: TravelPackage | null
}

export default function PackageModal({ isOpen, onClose, onSave, editingPackage }: PackageModalProps) {
  const [formData, setFormData] = useState<CreateTravelPackageData>({
    name: "",
    destination: "",
    description: "",
    duration_days: 1,
    duration_nights: 0,
    services: [],
    transportation: "",
    type: "paquete_viaje",
    image_url: "",
    price: undefined,
  })
  const [newService, setNewService] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>("")
  const [uploadProgress, setUploadProgress] = useState<string>("")
  const [useExistingUrl, setUseExistingUrl] = useState(false)

  useEffect(() => {
    if (editingPackage) {
      setFormData({
        name: editingPackage.name,
        destination: editingPackage.destination,
        description: editingPackage.description,
        duration_days: editingPackage.duration_days,
        duration_nights: editingPackage.duration_nights,
        services: [...editingPackage.services],
        transportation: editingPackage.transportation,
        type: editingPackage.type,
        image_url: editingPackage.image_url || "",
        price: editingPackage.price,
      })
      setImagePreview(editingPackage.image_url || "")
      setUseExistingUrl(!!editingPackage.image_url)
    } else {
      setFormData({
        name: "",
        destination: "",
        description: "",
        duration_days: 1,
        duration_nights: 0,
        services: [],
        transportation: "",
        type: "paquete_viaje",
        image_url: "",
        price: undefined,
      })
      setImagePreview("")
      setUseExistingUrl(false)
    }
    setErrors({})
    setSelectedFile(null)
    setUploadProgress("")
  }, [editingPackage, isOpen])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validar archivo
    const validation = validateImageFile(file)
    if (!validation.valid) {
      setErrors({ ...errors, image: validation.error || "" })
      return
    }

    // Limpiar errores previos
    const newErrors = { ...errors }
    delete newErrors.image
    setErrors(newErrors)

    setSelectedFile(file)
    setUseExistingUrl(false)

    // Crear preview
    const reader = new FileReader()
    reader.onloadend = () => {
      setImagePreview(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const removeImage = () => {
    setSelectedFile(null)
    setImagePreview("")
    setUseExistingUrl(false)
    setFormData({ ...formData, image_url: "" })
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) newErrors.name = "El nombre es requerido"
    if (!formData.destination.trim()) newErrors.destination = "El destino es requerido"
    if (!formData.description.trim()) newErrors.description = "La descripción es requerida"
    if (!formData.type) newErrors.type = "El tipo es requerido"
    if (formData.duration_days < 1) newErrors.duration_days = "La duración debe ser al menos 1 día"
    if (formData.duration_nights < 0) newErrors.duration_nights = "Las noches no pueden ser negativas"
    if (!formData.transportation.trim()) newErrors.transportation = "El medio de transporte es requerido"
    if (formData.services.length === 0) newErrors.services = "Debe agregar al menos un servicio"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsLoading(true)
    const supabase = createClient()

    try {
      let imageUrl = formData.image_url

      // Si hay un archivo seleccionado, subirlo primero
      if (selectedFile) {
        setUploadProgress("Optimizando imagen...")

        // Generar un ID temporal si es un paquete nuevo
        const packageId = editingPackage?.id || crypto.randomUUID()

        if (editingPackage) {
          setUploadProgress("Subiendo nueva imagen...")
          const result = await updatePackageImage(selectedFile, packageId, formData.image_url)
          imageUrl = result.url
        } else {
          setUploadProgress("Subiendo imagen...")
          const result = await uploadPackageImage(selectedFile, packageId)
          imageUrl = result.url
        }
      }

      // Actualizar formData con la URL de la imagen
      const dataToSave = {
        ...formData,
        image_url: imageUrl || null,
      }

      setUploadProgress("Guardando paquete...")

      let result
      if (editingPackage) {
        // Update existing package
        result = await supabase
          .from("travel_packages")
          .update(dataToSave)
          .eq("id", editingPackage.id)
          .select()
          .single()
      } else {
        // Create new package
        result = await supabase
          .from("travel_packages")
          .insert(dataToSave)
          .select()
          .single()
      }

      if (result.error) throw result.error

      onSave(result.data)
      onClose()
    } catch (error) {
      console.error("Error saving package:", error)
      setErrors({
        submit: error instanceof Error ? error.message : "Error al guardar el paquete. Inténtalo de nuevo."
      })
    } finally {
      setIsLoading(false)
      setUploadProgress("")
    }
  }

  const addService = () => {
    if (newService.trim() && !formData.services.includes(newService.trim())) {
      setFormData({
        ...formData,
        services: [...formData.services, newService.trim()],
      })
      setNewService("")
    }
  }

  const removeService = (serviceToRemove: string) => {
    setFormData({
      ...formData,
      services: formData.services.filter((service) => service !== serviceToRemove),
    })
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addService()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{editingPackage ? "Editar Paquete" : "Crear Nuevo Paquete"}</DialogTitle>
          <DialogDescription>
            {editingPackage
              ? "Modifica los detalles del paquete de viaje"
              : "Completa la información para crear un nuevo paquete de viaje"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre del Paquete *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ej: Aventura en los Esteros"
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="destination">Destino *</Label>
              <Input
                id="destination"
                value={formData.destination}
                onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                placeholder="Ej: Esteros del Iberá, Corrientes"
                className={errors.destination ? "border-red-500" : ""}
              />
              {errors.destination && <p className="text-sm text-red-500">{errors.destination}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Tipo *</Label>
            <Select value={formData.type} onValueChange={(value: PackageType) => setFormData({ ...formData, type: value })}>
              <SelectTrigger className={errors.type ? "border-red-500" : ""}>
                <SelectValue placeholder="Selecciona el tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="paquete_viaje">Paquete de Viaje</SelectItem>
                <SelectItem value="excursion">Excursión</SelectItem>
              </SelectContent>
            </Select>
            {errors.type && <p className="text-sm text-red-500">{errors.type}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descripción *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe la experiencia que ofrece este paquete..."
              rows={4}
              className={errors.description ? "border-red-500" : ""}
            />
            {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="duration_days">Días *</Label>
              <Input
                id="duration_days"
                type="number"
                min="1"
                value={formData.duration_days}
                onChange={(e) => setFormData({ ...formData, duration_days: Number.parseInt(e.target.value) || 1 })}
                className={errors.duration_days ? "border-red-500" : ""}
              />
              {errors.duration_days && <p className="text-sm text-red-500">{errors.duration_days}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration_nights">Noches *</Label>
              <Input
                id="duration_nights"
                type="number"
                min="0"
                value={formData.duration_nights}
                onChange={(e) => setFormData({ ...formData, duration_nights: Number.parseInt(e.target.value) || 0 })}
                className={errors.duration_nights ? "border-red-500" : ""}
              />
              {errors.duration_nights && <p className="text-sm text-red-500">{errors.duration_nights}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Precio (ARS)</Label>
              <Input
                id="price"
                type="number"
                min="0"
                step="0.01"
                value={formData.price || ""}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value ? Number.parseFloat(e.target.value) : undefined })
                }
                placeholder="Opcional"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="transportation">Medio de Transporte *</Label>
            <Input
              id="transportation"
              value={formData.transportation}
              onChange={(e) => setFormData({ ...formData, transportation: e.target.value })}
              placeholder="Ej: Lancha y vehículo 4x4"
              className={errors.transportation ? "border-red-500" : ""}
            />
            {errors.transportation && <p className="text-sm text-red-500">{errors.transportation}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Imagen de Portada</Label>

            {/* Preview de imagen existente o seleccionada */}
            {imagePreview && (
              <div className="relative w-full h-48 rounded-lg overflow-hidden border-2 border-gray-200">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
                {editingPackage?.image_url && !selectedFile && (
                  <div className="absolute bottom-2 left-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded">
                    {isSupabaseStorageUrl(editingPackage.image_url) ? "Imagen en Supabase" : "URL Externa"}
                  </div>
                )}
              </div>
            )}

            {/* Input de archivo */}
            <div className="flex items-center gap-2">
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <Label
                htmlFor="image"
                className="flex-1 flex items-center justify-center gap-2 border-2 border-dashed border-gray-300 rounded-lg p-4 cursor-pointer hover:border-green-500 transition-colors"
              >
                {selectedFile ? (
                  <>
                    <ImageIcon className="w-5 h-5 text-green-600" />
                    <span className="text-sm text-green-600">{selectedFile.name}</span>
                  </>
                ) : (
                  <>
                    <Upload className="w-5 h-5 text-gray-400" />
                    <span className="text-sm text-gray-500">
                      {imagePreview ? "Cambiar imagen" : "Seleccionar imagen"}
                    </span>
                  </>
                )}
              </Label>
            </div>

            {errors.image && <p className="text-sm text-red-500">{errors.image}</p>}

            <p className="text-xs text-gray-500">
              Tamaño máximo: 5MB. La imagen se optimizará automáticamente.
            </p>

            {/* Opción de mantener URL existente (solo al editar) */}
            {editingPackage?.image_url && !isSupabaseStorageUrl(editingPackage.image_url) && (
              <div className="text-xs text-gray-600 bg-gray-50 p-2 rounded">
                URL externa actual: <span className="font-mono text-xs break-all">{editingPackage.image_url}</span>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label>Servicios Incluidos *</Label>
            <div className="flex gap-2">
              <Input
                value={newService}
                onChange={(e) => setNewService(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Agregar servicio..."
                className="flex-1"
              />
              <Button type="button" onClick={addService} variant="outline" size="sm">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            {errors.services && <p className="text-sm text-red-500">{errors.services}</p>}

            <div className="flex flex-wrap gap-2 mt-2">
              {formData.services.map((service, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  {service}
                  <button type="button" onClick={() => removeService(service)} className="ml-1 hover:text-red-500">
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>

          {errors.submit && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
              {errors.submit}
            </div>
          )}

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-green-600 hover:bg-green-700" disabled={isLoading}>
              {isLoading ? (
                uploadProgress || "Guardando..."
              ) : (
                editingPackage ? "Actualizar" : "Crear Paquete"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
