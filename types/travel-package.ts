export type PackageType = 'excursion' | 'paquete_viaje'

export interface TravelPackage {
  id: string
  name: string
  destination: string
  description: string
  duration_days: number
  duration_nights: number
  services: string[]
  transportation: string
  type: PackageType
  image_url?: string
  price?: number
  created_at: string
  updated_at: string
}

export interface CreateTravelPackageData {
  name: string
  destination: string
  description: string
  duration_days: number
  duration_nights: number
  services: string[]
  transportation: string
  type: PackageType
  image_url?: string
  price?: number
}
