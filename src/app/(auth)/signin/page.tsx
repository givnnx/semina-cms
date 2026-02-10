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
    <div className="flex h-screen w-full items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md mx-4">
        <CardHeader className="text-center">
          <CardTitle>Sign In</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={action} className="space-y-4">
            {state?.message && (
              <div
                className={`p-3 rounded-md text-sm ${state.success ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
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
