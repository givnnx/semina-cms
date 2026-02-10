"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  fetchData,
  postData,
  putData,
  deleteData as apiDeleteData,
} from "@/lib/api";

export interface PaymentData {
  _id?: string;
  type: string;
  image: string;
}

export interface ActionState {
  success: boolean;
  message: string;
  errors?: {
    [key: string]: string[];
  };
}

export async function createPayment(
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const type = formData.get("type") as string;

  if (!type || type.trim() === "") {
    return {
      success: false,
      message: "Validation failed",
      errors: { type: ["Type is required"] },
    };
  }

  try {
    await postData("/v1/cms/payments", formData, true);
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to create payment",
    };
  }

  revalidatePath("/payments");
  redirect("/payments");
}

export async function updatePayment(
  id: string,
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const type = formData.get("type") as string;

  if (!type || type.trim() === "") {
    return {
      success: false,
      message: "Validation failed",
      errors: { type: ["Type is required"] },
    };
  }

  try {
    await putData(`/v1/cms/payments/${id}`, formData, true);
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to update payment",
    };
  }

  revalidatePath("/payments");
  redirect("/payments");
}

export async function deletePayment(id: string): Promise<ActionState> {
  try {
    await apiDeleteData(`/v1/cms/payments/${id}`);
    revalidatePath("/payments");
    return { success: true, message: "Payment deleted successfully" };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to delete payment",
    };
  }
}

export async function getPayments() {
  try {
    const res = await fetchData("/v1/cms/payments");
    return res.data as PaymentData[];
  } catch (error) {
    return [];
  }
}

export async function getPayment(id: string) {
  try {
    const res = await fetchData(`/v1/cms/payments/${id}`);
    return res.data as PaymentData;
  } catch (error) {
    return undefined;
  }
}
