"use client"

import type React from "react"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Image from "next/image"

export default function SignUpPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [repeatPassword, setRepeatPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    setIsLoading(true)
    setError(null)

    if (password !== repeatPassword) {
      setError("Las contraseñas no coinciden")
      setIsLoading(false)
      return
    }

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${window.location.origin}/admin`,
        },
      })
      if (error) throw error
      router.push("/auth/sign-up-success")
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Image src="/images/logo.png" alt="Turismo Diversidad" width={200} height={80} className="mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900">Crear Cuenta de Administrador</h1>
          <p className="text-gray-600">Registra una nueva cuenta para gestionar paquetes</p>
        </div>

        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Registrarse</CardTitle>
            <CardDescription className="text-center">Crea una nueva cuenta de administrador</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignUp}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@turismodiversidad.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-11"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Contraseña</Label>
                  <Input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-11"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="repeat-password">Repetir Contraseña</Label>
                  <Input
                    id="repeat-password"
                    type="password"
                    required
                    value={repeatPassword}
                    onChange={(e) => setRepeatPassword(e.target.value)}
                    className="h-11"
                  />
                </div>
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
                    {error}
                  </div>
                )}
                <Button type="submit" className="w-full h-11 bg-green-600 hover:bg-green-700" disabled={isLoading}>
                  {isLoading ? "Creando cuenta..." : "Crear Cuenta"}
                </Button>
              </div>
              <div className="mt-6 text-center text-sm text-gray-600">
                ¿Ya tienes una cuenta?{" "}
                <Link href="/auth/login" className="text-green-600 hover:text-green-700 underline">
                  Iniciar Sesión
                </Link>
              </div>
              <div className="mt-2 text-center text-sm text-gray-600">
                <Link href="/" className="text-green-600 hover:text-green-700 underline">
                  ← Volver al sitio web
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
