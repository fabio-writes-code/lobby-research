
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { registerFormSchema, type RegisterFormSchema } from '~/lib/validations/auth-schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { type PasswordResetToken } from '~/app/auth/password-reset/PasswordResetForm';
import axios from 'axios';
import { registerNewUser } from "~/actions/auth/register-user";

interface ErrorResponseData{
  error:string;
}

export function useRegisterForm(token:PasswordResetToken){
  const router = useRouter()
  const [error, setError] = useState<string|null>(null)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)


  const form = useForm<RegisterFormSchema>({
    resolver: zodResolver(registerFormSchema),
    defaultValues:{
      name:'',
      email:'',
      password:'',
      confirmPassword:'',
    }
  })

  const onSubmit = async(data:RegisterFormSchema) => {
    try{
      setError('')
      setIsSubmitting(true)

      if (token.email != data.email){
        setError("Email mismatch")
        setIsSubmitting(false)
        return
      }

      const userData = {
        name: data.name,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword
      }

      const response = await registerNewUser({token:token.token, data:userData})

      if (!response.success) throw new Error(response.error)

      setIsSubmitting(false)
      router.push('/')
      router.refresh()

    } catch (error) {
      console.log(error);
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
