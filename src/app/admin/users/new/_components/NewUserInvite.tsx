"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { inviteSchema } from "~/lib/validations/auth-schemas";
import type { InviteSchemaFormValues } from "~/lib/validations/auth-schemas";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Alert, AlertDescription } from "~/components/ui/alert";
import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";

import { createInviteToken } from "~/actions/auth/new-invite-token";
import { 
  Select, 
  SelectContent, 
  SelectItem,
  SelectTrigger, 
  SelectValue 
} from "~/components/ui/select";

export function NewUserInvite() {
  const router = useRouter();
  const [error, setError] = useState<string | undefined>();
  const { pending } = useFormStatus();

  const form = useForm<InviteSchemaFormValues>({
    resolver: zodResolver(inviteSchema),
    defaultValues: {
      email: "",
      role: "CLIENT"
    },
  });

  async function onSubmit(values: InviteSchemaFormValues) {
    setError(undefined);

    try {
      const result = await createInviteToken(values);
      
      if (!result.success) {
        setError(result.error);
        return;
      }

      // TODO: create page to manage users
      router.push("/admin/users");
      router.refresh();
    } catch (error) {
      setError(error instanceof Error ? error.message : "Something went wrong");
    }
  }

  return (
    <Card className="w-[36rem] mx-auto">
      <CardHeader>
        <CardTitle>Invite New User</CardTitle>
        <CardDescription>Send an invitation to a new user</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} type="email" disabled={pending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a role New User"/>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="ADMIN">Admin</SelectItem>
                      <SelectItem value="STAFF">Staff</SelectItem>
                      <SelectItem value="CLIENT">Client</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <Button type="submit" className="w-full" disabled={pending}>
              {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Send Invitation
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
