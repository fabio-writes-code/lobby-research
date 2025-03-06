import Link from "next/link";
import { PasswordResetForm } from "./PasswordResetForm";
import { getPasswordResetTokenByToken } from "~/app/data/passwordResetToken";
import { Button } from "~/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "~/components/ui/card";

interface RegistrationPageProps {
  searchParams: {
    token: string;
  };
}

const RegistrationPage = async ({ searchParams }: RegistrationPageProps) => {
  const passwordToken = await getPasswordResetTokenByToken(searchParams.token);
  
  if (!passwordToken) {
    return (
      <Card className="h-full flex justify-center align-center max-w-md mx-auto mt-8">
        <CardHeader>
          <CardTitle>Invalid Reset Link</CardTitle>
          <CardDescription>
            This password reset link is invalid or has already been used.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Link href="/auth/request-password-reset">
            <Button variant="secondary" className="w-full">
              Request New Reset Link
            </Button>
          </Link>
          <Link href="/">
            <Button variant="outline" className="w-full">
              Return to Homepage
            </Button>
          </Link>
        </CardContent>
      </Card>
    );
  }
  
  if (new Date(passwordToken.expiresAt) < new Date()) {
    return (
      <div className="h-full flex justify-center items-center">
      <Card className="max-w-md mx-auto mt-8">
        <CardHeader>
          <CardTitle>Expired Reset Link</CardTitle>
          <CardDescription>
            This password reset link has expired. Please request a new one.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Link href="/auth/request-password-reset">
            <Button variant="secondary" className="w-full">
              Request New Reset Link
            </Button>
          </Link>
          <Link href="/">
            <Button variant="outline" className="w-full">
              Return to Homepage
            </Button>
          </Link>
        </CardContent>
      </Card>
      </div>
    );
  }

  return <PasswordResetForm token={passwordToken} />;
};

export default RegistrationPage;
