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

    const cookieStore = await cookies();
    cookieStore.set("token", token, { httpOnly: true, path: "/" });
    cookieStore.set("role", role, { httpOnly: true, path: "/" });
  } catch (error: any) {
    return { success: false, message: error.message || "Invalid credentials" };
  }

  redirect("/");
}
