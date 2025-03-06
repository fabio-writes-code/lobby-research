"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "~/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form"
import { Input } from "~/components/ui/input"
import { Alert, AlertDescription } from "~/components/ui/alert"
import { requestPasswordResetToken } from "~/actions/reset-password-token"
import type { PasswordResetTokenRequest} from "~/lib/validations/password-reset"
import { passwordResetTokenRequest } from "~/lib/validations/password-reset"

export function PasswordResetRequestForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const form = useForm<PasswordResetTokenRequest>({
    resolver: zodResolver(passwordResetTokenRequest),
    defaultValues:{
      email:''
    }
  })

  async function onSubmit(values: PasswordResetTokenRequest) {
    setStatus("loading")
    setErrorMessage(null)

    try {
      const result = await requestPasswordResetToken({email:values.email});
      if (!result.success) {
        setStatus("error");
        setErrorMessage("An error occurred. Please try again");
      } else {
        setStatus("success");
      }
    } catch (error) {
      setStatus("error");
      setErrorMessage("An error occurred. Please try again");
      console.error(error);
    }
  }

  if (status === "success") {
    return (
      <Alert>
        <AlertDescription>
          If an account exists for that email, we have sent password reset instructions.
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {errorMessage && (
          <Alert variant="destructive">
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}
        <Button type="submit" className="w-full" disabled={status === "loading"}>
          {status === "loading" ? "Sending..." : "Request Password Reset"}
        </Button>
      </form>
    </Form>
  )
}

