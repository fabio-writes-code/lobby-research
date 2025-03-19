import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { passwordResetSchema, type PasswordResetFormValues } from '~/lib/validations/password-reset';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { type PasswordResetToken } from '~/app/auth/password-reset/PasswordResetForm';
import axios from 'axios';
import { resetPassword } from "~/actions/reset-password";
import * as Sentry from "@sentry/nextjs";

interface ErrorResponseData{
  error:string;
}

export function usePasswordReset(token:PasswordResetToken){
  const router = useRouter()
  const [error, setError] = useState<string|null>(null)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const form = useForm<PasswordResetFormValues>({
    resolver: zodResolver(passwordResetSchema),
    defaultValues:{
      email:'',
      password:'',
      confirmPassword:'',
    }
  })

  const onSubmit = async(data:PasswordResetFormValues) => {
    try{
      setError('')
      setIsSubmitting(true)

      if (token.email != data.email){
        setError("Email mismatch")
        setIsSubmitting(false)
        return
      }

      const userData = {
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword
      }

      // await axios.post(`/api/users/password-reset?token=${token.token}`, userData);
      const response = await resetPassword({token:token.token, data:userData})

      if (!response.success) throw new Error(response.error)

      setIsSubmitting(false)
      router.push('/')
      router.refresh()

    } catch (error) {
      Sentry.captureException(error, {
        level: "error",
        tags: {
          action: "client_password_reset",
          status: "failed",
          email: data.email
        },
        contexts: {
          resetAttempt: {
            errorType: axios.isAxiosError(error) ? `HTTP ${error.response?.status ?? 'unknown'}` : "Client error"
          }
        }
      });
      
      if (process.env.NODE_ENV !== "production") {
        console.error("Password reset client error:", error);
      }
      
      setIsSubmitting(false);
      if (axios.isAxiosError<ErrorResponseData>(error) && error.response) {
        if (error.response?.status === 400) {
          setError(error.response.data.error);
        } else {
          setError('An error occurred. Please try again.');
        }
      } else {
        setError('An unexpected error occurred.');
      }
    }
  }
  
  return{
    form, onSubmit, error, isSubmitting
  }
}
