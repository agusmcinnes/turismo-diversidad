# Configuración de Supabase Storage para Imágenes de Paquetes

Este documento contiene las instrucciones para configurar el bucket de Supabase Storage que almacenará las imágenes de portada de los paquetes turísticos.

## Pasos para Configurar el Bucket

### 1. Acceder a Supabase Dashboard

1. Ve a [https://app.supabase.com](https://app.supabase.com)
2. Inicia sesión con tu cuenta
3. Selecciona tu proyecto: `swmpkdxtitasgkmrmrpr`

### 2. Crear el Bucket

1. En el menú lateral izquierdo, haz clic en **Storage**
2. Haz clic en el botón **"New bucket"** o **"Crear bucket"**
3. Configura el bucket con los siguientes datos:
   - **Name**: `package-images`
   - **Public bucket**: ✅ **Marcado** (las imágenes serán públicamente accesibles)
   - **File size limit**: Dejar vacío o configurar según necesidad
   - **Allowed MIME types**: Dejar vacío (aceptará cualquier tipo de imagen)
4. Haz clic en **"Create bucket"** o **"Crear"**

### 3. Configurar Políticas de Acceso (RLS)

El bucket público ya permite lectura a todos, pero necesitamos configurar quién puede subir/eliminar imágenes.

#### Política 1: Permitir lectura pública (ya viene por defecto en buckets públicos)

Si no está configurada, agrégala:

```sql
-- Policy name: Public Access
-- Allowed operation: SELECT

CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'package-images');
```

#### Política 2: Permitir upload solo a usuarios autenticados

```sql
-- Policy name: Authenticated users can upload
-- Allowed operation: INSERT

CREATE POLICY "Authenticated users can upload"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'package-images');
```

#### Política 3: Permitir actualización solo a usuarios autenticados

```sql
-- Policy name: Authenticated users can update
-- Allowed operation: UPDATE

CREATE POLICY "Authenticated users can update"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'package-images');
```

#### Política 4: Permitir eliminación solo a usuarios autenticados

```sql
-- Policy name: Authenticated users can delete
-- Allowed operation: DELETE

CREATE POLICY "Authenticated users can delete"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'package-images');
```

### 4. Aplicar las Políticas

1. Ve a **Storage** → **Policies**
2. Selecciona el bucket `package-images`
3. Haz clic en **"New policy"**
4. Puedes usar el editor visual o pegar directamente las políticas SQL de arriba
5. Crea cada una de las 4 políticas

### 5. Verificar la Configuración

Una vez creado el bucket y las políticas:

1. Ve a **Storage** → **package-images**
2. Verifica que el bucket aparezca como **Public**
3. Ve a la pestaña **Policies** del bucket
4. Deberías ver las 4 políticas listadas:
   - ✅ Public Access (SELECT)
   - ✅ Authenticated users can upload (INSERT)
   - ✅ Authenticated users can update (UPDATE)
   - ✅ Authenticated users can delete (DELETE)

## Estructura de Archivos

Las imágenes se guardarán con la siguiente nomenclatura:

```
package-images/
  ├── {package-id}-{timestamp}.webp
  ├── {package-id}-{timestamp}.jpg
  └── {package-id}-{timestamp}.png
```

Ejemplo:
```
package-images/
  └── 123e4567-e89b-12d3-a456-426614174000-1703001234567.webp
```

## URLs de Acceso

Una vez subida una imagen, la URL pública será:

```
https://swmpkdxtitasgkmrmrpr.supabase.co/storage/v1/object/public/package-images/{filename}
```

## Notas Importantes

- ✅ Las imágenes son públicamente accesibles (no requieren autenticación para verlas)
- ✅ Solo usuarios autenticados pueden subir, actualizar o eliminar imágenes
- ✅ Formatos permitidos: Cualquier formato de imagen
- ✅ Las imágenes se optimizan automáticamente en el cliente antes de subirse
- ✅ El código mantiene compatibilidad con URLs externas existentes

## Próximos Pasos

Una vez completada la configuración del bucket:

1. ✅ Verifica que el bucket `package-images` esté creado
2. ✅ Verifica que las políticas estén aplicadas
3. ✅ Continúa con la instalación de dependencias del proyecto
4. ✅ Prueba subiendo una imagen desde el panel de administrador

## Troubleshooting

### Error: "new row violates row-level security policy"
- Verifica que las políticas INSERT, UPDATE y DELETE estén creadas correctamente
- Asegúrate de estar autenticado al intentar subir imágenes

### Error: "Bucket not found"
- Verifica que el nombre del bucket sea exactamente `package-images`
- Verifica que el bucket esté en el proyecto correcto

### Error: "File size exceeds limit"
- Las imágenes se optimizan automáticamente, pero verifica que el archivo original no exceda 10-15 MB
- El límite del bucket es 5 MB después de la optimización
