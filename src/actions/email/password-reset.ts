'use server'

import { Resend } from 'resend';
import EmailPasswordReset from '~/components/email/PasswordReset';
import { headers } from 'next/headers';

const resend = new Resend(process.env.RESEND_API_KEY);

interface Props{
  email:string,
  token:string,
} 

export async function sendPasswordResetEmail({email, token}:Props) {
  const pathRoot = headers().get('referer')!.replace('/auth/request-password-reset','')

  try {
    const { data, error } = await resend.emails.send({
      from: 'Alberta Counsel Contacts Manager <info@albertacounsel.com>',
      to: [email],
      subject: 'Reset Your Password',
      react: EmailPasswordReset({ pathRoot, token }),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
