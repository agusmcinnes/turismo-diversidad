import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CheckCircle, Mail } from "lucide-react"
import Image from "next/image"

export default function SignUpSuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Image src="/images/logo.png" alt="Turismo Diversidad" width={200} height={80} className="mx-auto mb-4" />
        </div>

        <Card className="shadow-xl">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl text-green-600">¡Cuenta Creada!</CardTitle>
            <CardDescription>Tu cuenta de administrador ha sido creada exitosamente</CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <Mail className="w-6 h-6 text-blue-600 mx-auto mb-2" />
              <p className="text-sm text-blue-800">
                <strong>Verifica tu email</strong>
                <br />
                Hemos enviado un enlace de confirmación a tu correo electrónico. Haz clic en el enlace para activar tu
                cuenta.
              </p>
            </div>

            <div className="space-y-3">
              <Button asChild className="w-full bg-green-600 hover:bg-green-700">
                <Link href="/auth/login">Ir al Login</Link>
              </Button>
              <Button asChild variant="outline" className="w-full bg-transparent">
                <Link href="/">Volver al Sitio Web</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
