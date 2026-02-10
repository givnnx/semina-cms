"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  fetchData,
  postData,
  putData,
  deleteData as apiDeleteData,
} from "@/lib/api";

export interface TalentData {
  _id?: string;
  name: string;
  role: string;
  image: string;
}

export interface ActionState {
  success: boolean;
  message: string;
  errors?: {
    [key: string]: string[];
  };
}

export async function createTalent(
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const name = formData.get("name") as string;
  const role = formData.get("role") as string;

  // Simple validation
  if (!name || name.trim() === "") {
    return {
      success: false,
      message: "Validation failed",
      errors: { name: ["Name is required"] },
    };
  }
  if (!role || role.trim() === "") {
    return {
      success: false,
      message: "Validation failed",
      errors: { role: ["Role is required"] },
    };
  }

  // We pass formData directly because it includes the file 'image'
  // postData will handle setting Content-Type to multipart/form-data via isFormData=true logic (or implicit fetch behavior)
  try {
    await postData("/v1/cms/talents", formData, true);
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to create talent",
    };
  }

  revalidatePath("/talents");
  redirect("/talents");
}

export async function updateTalent(
  id: string,
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const name = formData.get("name") as string;
  const role = formData.get("role") as string;

  if (!name || name.trim() === "") {
    return {
      success: false,
      message: "Validation failed",
      errors: { name: ["Name is required"] },
    };
  }
  if (!role || role.trim() === "") {
    return {
      success: false,
      message: "Validation failed",
      errors: { role: ["Role is required"] },
    };
  }

  try {
    await putData(`/v1/cms/talents/${id}`, formData, true);
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to update talent",
    };
  }

  revalidatePath("/talents");
  redirect("/talents");
}

export async function deleteTalent(id: string): Promise<ActionState> {
  try {
    await apiDeleteData(`/v1/cms/talents/${id}`);
    revalidatePath("/talents");
    return { success: true, message: "Talent deleted successfully" };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to delete talent",
    };
  }
}

export async function getTalents() {
  try {
    const res = await fetchData("/v1/cms/talents");
    return res.data as TalentData[];
  } catch (error) {
    return [];
  }
}

export async function getTalent(id: string) {
  try {
    const res = await fetchData(`/v1/cms/talents/${id}`);
    return res.data as TalentData;
  } catch (error) {
    return undefined;
  }
}
