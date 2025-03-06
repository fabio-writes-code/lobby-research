
"use client"

import { Button } from "~/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage  } from "~/components/ui/form"
import { Input } from "~/components/ui/input"
import { AlertDescription, Alert } from "~/components/ui/alert"
import { Loader2 } from "lucide-react"
import Link from "next/link"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card"
import { useRegisterForm } from "~/hooks/use-user-registration"


export interface RegisterAccountFormProps {
  token:RegisterAccountToken
}

export interface RegisterAccountToken{
    email:string, token:string, id:string, expiresAt:Date|null
}

export function RegisterAccountForm({ token }: RegisterAccountFormProps) {
  
  const {form, error, isSubmitting, onSubmit} = useRegisterForm(token)

  return (
    <div className="flex h-full items-center justify-center bg-background">
      <Card className="w-[36rem]">
        <CardHeader>
          <CardTitle>Create your account</CardTitle>
          <CardDescription>Enter your password below</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Organization Name</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Enter your company/organization name" 
                    {...field} 
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Enter your email" 
                    {...field} 
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <Input 
                    type="password" 
                    placeholder="Enter new password" 
                    {...field} 
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm New Password</FormLabel>
                <FormControl>
                  <Input 
                    type="password" 
                    placeholder="Confirm new password" 
                    {...field} 
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isSubmitting ? "Registering..." : "Register Account"}
          </Button>
        <div className="mt-4 text-center">
          <Link href="/auth/sign-in" className="text-sm text-blue-600 hover:underline">
            Back to Sign In
          </Link>
        </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
  )
}

