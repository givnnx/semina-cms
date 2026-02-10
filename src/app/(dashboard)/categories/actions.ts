"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  fetchData,
  postData,
  putData,
  deleteData as apiDeleteData,
} from "@/lib/api";

export interface CategoryData {
  _id?: string;
  name: string;
}

export interface ActionState {
  success: boolean;
  message: string;
  errors?: {
    [key: string]: string[];
  };
}

export async function createCategory(
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const name = formData.get("name") as string;

  if (!name || name.trim() === "") {
    return {
      success: false,
      message: "Validation failed",
      errors: { name: ["Name is required"] },
    };
  }

  try {
    await postData("/v1/cms/categories", { name });
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to create category",
    };
  }

  revalidatePath("/categories");
  redirect("/categories");
}

export async function updateCategory(
  id: string,
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const name = formData.get("name") as string;

  if (!name || name.trim() === "") {
    return {
      success: false,
      message: "Validation failed",
      errors: { name: ["Name is required"] },
    };
  }

  try {
    await putData(`/v1/cms/categories/${id}`, { name });
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to update category",
    };
  }

  revalidatePath("/categories");
  redirect("/categories");
}

export async function deleteCategory(id: string): Promise<ActionState> {
  try {
    await apiDeleteData(`/v1/cms/categories/${id}`);
    revalidatePath("/categories");
    return { success: true, message: "Category deleted successfully" };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to delete category",
    };
  }
}

export async function getCategories() {
  try {
    const res = await fetchData("/v1/cms/categories");
    return res.data as CategoryData[];
  } catch (error) {
    return [];
  }
}

export async function getCategory(id: string) {
  try {
    const res = await fetchData(`/v1/cms/categories/${id}`);
    return res.data as CategoryData;
  } catch (error) {
    return undefined;
  }
}
