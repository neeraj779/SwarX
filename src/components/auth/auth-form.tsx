"use client";

import { authFormSchema, AuthFormSchema } from "@/schemas/auth-form-schema.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { cn } from "@/lib/utils";

import { AuthFormProps } from "@/types/auth.types";

import { useEmailAuth } from "../../hooks/use-email-auth";
import { SocialAuthButtons } from "./social-auth-buttons";

export function AuthForm({
  className,
  mode = "signin",
  ...props
}: AuthFormProps) {
  const isSignIn = mode === "signin";
  const { authenticate, isLoading } = useEmailAuth(isSignIn);

  const form = useForm<AuthFormSchema>({
    resolver: zodResolver(authFormSchema),
    defaultValues: {
      ...(isSignIn ? {} : { name: "" }),
      email: "",
      password: "",
    },
  });

  function onSubmit(values: AuthFormSchema) {
    authenticate(values);
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">
            {isSignIn ? "Welcome back" : "Create an account"}
          </CardTitle>
          <CardDescription>
            {isSignIn
              ? "Login with your email or social accounts"
              : "Sign up with your email or social accounts"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
              <SocialAuthButtons mode={mode} />
              <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                <span className="bg-background text-muted-foreground relative z-10 px-2">
                  Or continue with
                </span>
              </div>
              <div className="grid gap-6">
                {!isSignIn && (
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="m@example.com"
                          {...field}
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
                      <div className="flex items-center">
                        <FormLabel>Password</FormLabel>
                        {isSignIn && (
                          <a
                            href="#"
                            className="ml-auto text-sm underline-offset-4 hover:underline">
                            Forgot your password?
                          </a>
                        )}
                      </div>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      {isSignIn ? "Signing in..." : "Signing up..."}
                    </>
                  ) : isSignIn ? (
                    "Sign in"
                  ) : (
                    "Sign up"
                  )}
                </Button>
              </div>
              <div className="text-center text-sm">
                {isSignIn ? (
                  <>
                    Don&apos;t have an account?{" "}
                    <a href="/signup" className="underline underline-offset-4">
                      Sign up
                    </a>
                  </>
                ) : (
                  <>
                    Already have an account?{" "}
                    <a href="/signin" className="underline underline-offset-4">
                      Sign in
                    </a>
                  </>
                )}
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      <div className="text-muted-foreground [&_a]:hover:text-primary text-center text-xs text-balance [&_a]:underline [&_a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
