"use client";

import { useActionState, useState } from "react";
import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/atoms/Card";
import { FormField } from "@/components/molecules/FormField";
import { ActionState } from "@/app/(dashboard)/talents/actions";
import Image from "next/image";

interface TalentFormProps {
  initialData?: {
    _id?: string;
    name: string;
    role: string;
    image: string;
  };
  action: (state: ActionState, payload: FormData) => Promise<ActionState>;
  title: string;
}

export default function TalentForm({
  initialData,
  action,
  title,
}: TalentFormProps) {
  const [state, formAction, isPending] = useActionState(action, {
    success: false,
    message: "",
  });

  // Mock image preview state
  const [imagePreview, setImagePreview] = useState<string | null>(
    initialData?.image ? `/${initialData.image}` : null,
  );

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

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
            label="Name"
            placeholder="Enter talent name"
            defaultValue={initialData?.name}
            required
            disabled={isPending}
            error={state?.errors?.name}
          />

          <FormField
            id="role"
            name="role"
            label="Role"
            placeholder="Enter talent role"
            defaultValue={initialData?.role}
            required
            disabled={isPending}
            error={state?.errors?.role}
          />

          <div className="space-y-2">
            <label className="text-sm font-medium leading-none">Avatar</label>
            <div className="flex items-center gap-4">
              {imagePreview && (
                <div className="relative h-20 w-20 overflow-hidden rounded-full border">
                  {/* Using simple img for mock/external, next/image requires configuration */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imagePreview}
                    alt="Avatar"
                    className="h-full w-full object-cover"
                  />
                </div>
              )}
              <Input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                disabled={isPending}
              />
              {/* Hidden input to pass mock image identifier to server action */}
              <input
                type="hidden"
                name="imageDisplay"
                value={imagePreview || ""}
              />
            </div>
          </div>

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
