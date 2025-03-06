"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { type z } from "zod";
import { signInAction } from "~/actions/signIn";
import { LoginFormSchema } from "~/lib/validations/auth-schemas";
import { Button } from "~/components/ui/button";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";

export default function SignInPage() {
  const form = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");

  const onSubmit = form.handleSubmit(async (data) => {
    setError("");
    startTransition(() => {
      signInAction(data)
        .then((response) => setError(response?.error))
        .catch(console.error);
    });
  });

  return (
    <div className="flex h-full items-center justify-center bg-background">
      {error && <div>{error}</div>}
      <Card className="w-[36rem]">
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
          <CardDescription>Enter your account credentials</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={onSubmit} className="space-y-8">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your email" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? "Logging in..." : "Login"}
              </Button>
                <div className="mt-4 text-center">
                  <Link href="/auth/request-password-reset" className="text-sm text-blue-600 hover:underline">
                    Forgot your password?
                  </Link>
                </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
