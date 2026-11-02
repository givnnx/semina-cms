"use client";

import { useActionState } from "react";
import { Button } from "@/components/atoms/Button";
import { FormField } from "@/components/molecules/FormField";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/atoms/Card";
import { ActionState } from "../actions";

interface CategoryFormProps {
  initialData?: {
    _id?: string;
    name: string;
  };
  action: (state: ActionState, payload: FormData) => Promise<ActionState>;
  title: string;
}

export default function CategoryForm({
  initialData,
  action,
  title,
}: CategoryFormProps) {
  const [state, formAction, isPending] = useActionState(action, {
    success: false,
    message: "",
  });

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          {state?.message && !state.success && (
            <div
              role="alert"
              className="p-3 rounded-md text-sm font-medium bg-alert-danger-bg text-destructive border border-alert-danger-border"
            >
              {state.message}
            </div>
          )}

          <FormField
            id="name"
            name="name"
            label="Category Name"
            placeholder="Enter category name"
            defaultValue={initialData?.name}
            required
            disabled={isPending}
            error={state?.errors?.name}
          />

          <div className="flex justify-end space-x-2">
            <Button type="submit" disabled={isPending}>
              {isPending ? "Saving..." : "Save"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
