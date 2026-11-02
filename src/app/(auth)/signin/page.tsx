"use client";

import { signinAction } from "@/app/(auth)/signin/actions";
import { Button } from "@/components/atoms/Button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/atoms/Card";
import { Input } from "@/components/atoms/Input";
import { useActionState } from "react";

export default function SigninPage() {
  const [state, action, isPending] = useActionState(signinAction, {
    success: false,
    message: "",
  });

  return (
    <div className="flex h-screen w-full items-center justify-center bg-background text-foreground">
      <Card className="w-full max-w-md mx-4">
        <CardHeader className="text-center">
          <CardTitle>Sign In</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={action} className="space-y-4">
            {state?.message && (
              <div
                role="alert"
                className={`p-3 rounded-md text-sm font-medium border ${
                  state.success
                    ? "bg-alert-success-bg text-success border-alert-success-border"
                    : "bg-alert-danger-bg text-destructive border-alert-danger-border"
                }`}
              >
                {state.message}
              </div>
            )}
            <div className="space-y-2">
              <Input
                name="email"
                type="email"
                placeholder="Email address"
                required
                className="w-full"
                disabled={isPending}
              />
            </div>
            <div className="space-y-2">
              <Input
                name="password"
                type="password"
                placeholder="Password"
                required
                className="w-full"
                disabled={isPending}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
