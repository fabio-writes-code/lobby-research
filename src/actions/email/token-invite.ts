
'use server'

import { Resend } from 'resend';
import { headers } from 'next/headers';
import EmailInviteToken from '~/components/email/TokenInvite';

const resend = new Resend(process.env.RESEND_API_KEY);

interface Props{
  email:string,
  token:string,
} 

export async function sendInviteToken({email, token}:Props) {
  // TODO: update URL 
  const pathRoot = headers().get('referer')!.replace('/auth/request-password-reset','')

  try {
    const { data, error } = await resend.emails.send({
      from: 'Alberta Counsel Contacts Manager <info@albertacounsel.com>',
      to: [email],
      subject: "You've been invited to Alberta Counsel's Hansard Review",
      react: EmailInviteToken({ pathRoot, token }),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
