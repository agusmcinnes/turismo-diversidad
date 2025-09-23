import { createClient } from "@/lib/supabase/server"
import type { TravelPackage, CreateTravelPackageData } from "@/types/travel-package"

export async function getTravelPackages(): Promise<TravelPackage[]> {
  const supabase = await createClient()

  const { data, error } = await supabase.from("travel_packages").select("*").order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching travel packages:", error)
    return []
  }

  return data || []
}

export async function getTravelPackageById(id: string): Promise<TravelPackage | null> {
  const supabase = await createClient()

  const { data, error } = await supabase.from("travel_packages").select("*").eq("id", id).single()

  if (error) {
    console.error("Error fetching travel package:", error)
    return null
  }

  return data
}

export async function createTravelPackage(packageData: CreateTravelPackageData): Promise<TravelPackage | null> {
  const supabase = await createClient()

  const { data, error } = await supabase.from("travel_packages").insert(packageData).select().single()

  if (error) {
    console.error("Error creating travel package:", error)
    return null
  }

  return data
}

export async function updateTravelPackage(
  id: string,
  packageData: Partial<CreateTravelPackageData>,
): Promise<TravelPackage | null> {
  const supabase = await createClient()

  const { data, error } = await supabase.from("travel_packages").update(packageData).eq("id", id).select().single()

  if (error) {
    console.error("Error updating travel package:", error)
    return null
  }

  return data
}

export async function deleteTravelPackage(id: string): Promise<boolean> {
  const supabase = await createClient()

  const { error } = await supabase.from("travel_packages").delete().eq("id", id)

  if (error) {
    console.error("Error deleting travel package:", error)
    return false
  }

  return true
}
