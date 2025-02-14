
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { PasswordResetRequestForm } from "./password-reset-request-form"

export default function ForgotPasswordPage() {
  return (
    <div className="flex h-full items-center justify-center bg-background">
       <Card className="w-[36rem]">
        <CardHeader>
          <CardTitle>Forgot Password</CardTitle>
        </CardHeader>
      <CardContent>
        <PasswordResetRequestForm />
      </CardContent>
      </Card>
    </div>
  )
}


