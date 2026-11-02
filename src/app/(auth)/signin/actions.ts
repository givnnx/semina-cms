"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { postData } from "@/lib/api";

export interface ActionState {
  success: boolean;
  message: string;
}

export async function signinAction(prevState: ActionState, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { success: false, message: "Email and Password are required" };
  }

  try {
    const res = await postData("/v1/cms/auth/signin", { email, password });

    // Assuming response structure: { data: { token: string, role: string } }
    const { token, role } = res.data;

    const isProd = process.env.NODE_ENV === "production";
    const cookieStore = await cookies();
    cookieStore.set("token", token, {
      httpOnly: true,
      secure: isProd,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 2,
    });
    cookieStore.set("role", role, {
      httpOnly: true,
      secure: isProd,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 2,
    });
  } catch (error: unknown) {
    const msg =
      error instanceof Error ? error.message : "Invalid credentials";
    return { success: false, message: msg };
  }

  redirect("/");
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("token");
  cookieStore.delete("role");
  redirect("/signin");
}
