import imageCompression from 'browser-image-compression'
import { createClient } from './client'

const BUCKET_NAME = 'package-images'
const MAX_FILE_SIZE_MB = 5
const MAX_WIDTH = 1920
const MAX_HEIGHT = 1080

/**
 * Valida que el archivo sea una imagen válida
 */
export function validateImageFile(file: File): { valid: boolean; error?: string } {
  // Verificar que sea un archivo
  if (!file) {
    return { valid: false, error: 'No se seleccionó ningún archivo' }
  }

  // Verificar que sea una imagen (cualquier tipo)
  if (!file.type.startsWith('image/')) {
    return {
      valid: false,
      error: 'El archivo debe ser una imagen',
    }
  }

  return { valid: true }
}

/**
 * Optimiza una imagen antes de subirla
 */
export async function optimizeImage(file: File): Promise<File> {
  const options = {
    maxSizeMB: MAX_FILE_SIZE_MB,
    maxWidthOrHeight: Math.max(MAX_WIDTH, MAX_HEIGHT),
    useWebWorker: true,
    fileType: 'image/webp', // Convertir a WebP para mejor compresión
  }

  try {
    const compressedFile = await imageCompression(file, options)
    return compressedFile
  } catch (error) {
    console.error('Error al optimizar imagen:', error)
    throw new Error('No se pudo optimizar la imagen')
  }
}

/**
 * Genera un nombre único para el archivo
 */
function generateFileName(packageId: string, originalFileName: string): string {
  const timestamp = Date.now()
  const extension = originalFileName.split('.').pop() || 'webp'
  return `${packageId}-${timestamp}.${extension}`
}

/**
 * Sube una imagen al bucket de Supabase Storage
 * @param file - Archivo de imagen a subir
 * @param packageId - ID del paquete (para nombrar el archivo)
 * @returns URL pública de la imagen subida
 */
export async function uploadPackageImage(
  file: File,
  packageId: string
): Promise<{ url: string; path: string }> {
  // Validar archivo
  const validation = validateImageFile(file)
  if (!validation.valid) {
    throw new Error(validation.error)
  }

  // Optimizar imagen
  const optimizedFile = await optimizeImage(file)

  // Generar nombre único
  const fileName = generateFileName(packageId, optimizedFile.name)
  const filePath = fileName

  // Crear cliente de Supabase
  const supabase = createClient()

  // Subir archivo
  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(filePath, optimizedFile, {
      cacheControl: '3600',
      upsert: false,
    })

  if (error) {
    console.error('Error al subir imagen:', error)
    throw new Error(`Error al subir imagen: ${error.message}`)
  }

  // Obtener URL pública
  const {
    data: { publicUrl },
  } = supabase.storage.from(BUCKET_NAME).getPublicUrl(data.path)

  return {
    url: publicUrl,
    path: data.path,
  }
}

/**
 * Actualiza la imagen de un paquete
 * Elimina la imagen anterior si existe y sube la nueva
 */
export async function updatePackageImage(
  file: File,
  packageId: string,
  oldImageUrl?: string
): Promise<{ url: string; path: string }> {
  // Si existe una imagen anterior en el bucket, eliminarla
  if (oldImageUrl && oldImageUrl.includes(BUCKET_NAME)) {
    try {
      await deletePackageImageByUrl(oldImageUrl)
    } catch (error) {
      console.error('Error al eliminar imagen anterior:', error)
      // Continuar aunque falle la eliminación
    }
  }

  // Subir nueva imagen
  return uploadPackageImage(file, packageId)
}

/**
 * Elimina una imagen del bucket usando la URL
 */
export async function deletePackageImageByUrl(imageUrl: string): Promise<void> {
  // Verificar que la URL sea del bucket
  if (!imageUrl.includes(BUCKET_NAME)) {
    // No es una imagen del bucket, no hacer nada
    return
  }

  // Extraer el path del archivo de la URL
  const urlParts = imageUrl.split(`${BUCKET_NAME}/`)
  if (urlParts.length < 2) {
    throw new Error('URL de imagen inválida')
  }

  const filePath = urlParts[1]

  const supabase = createClient()

  const { error } = await supabase.storage.from(BUCKET_NAME).remove([filePath])

  if (error) {
    console.error('Error al eliminar imagen:', error)
    throw new Error(`Error al eliminar imagen: ${error.message}`)
  }
}

/**
 * Elimina una imagen del bucket usando el path
 */
export async function deletePackageImage(filePath: string): Promise<void> {
  const supabase = createClient()

  const { error } = await supabase.storage.from(BUCKET_NAME).remove([filePath])

  if (error) {
    console.error('Error al eliminar imagen:', error)
    throw new Error(`Error al eliminar imagen: ${error.message}`)
  }
}

/**
 * Obtiene la URL pública de una imagen
 */
export function getPublicUrl(filePath: string): string {
  const supabase = createClient()
  const {
    data: { publicUrl },
  } = supabase.storage.from(BUCKET_NAME).getPublicUrl(filePath)

  return publicUrl
}

/**
 * Verifica si una URL es una imagen del bucket de Supabase
 */
export function isSupabaseStorageUrl(url: string): boolean {
  return url.includes(BUCKET_NAME) && url.includes('supabase.co/storage')
}
