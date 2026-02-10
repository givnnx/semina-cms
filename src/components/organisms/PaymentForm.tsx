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
import { ActionState } from "@/app/(dashboard)/payments/actions";

interface PaymentFormProps {
  initialData?: {
    _id?: string;
    type: string;
    image: string;
  };
  action: (state: ActionState, payload: FormData) => Promise<ActionState>;
  title: string;
}

export default function PaymentForm({
  initialData,
  action,
  title,
}: PaymentFormProps) {
  const [state, formAction, isPending] = useActionState(action, {
    success: false,
    message: "",
  });

  const [imagePreview, setImagePreview] = useState<string | null>(
    initialData?.image ? `/${initialData.image}` : null,
  );

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview("https://placehold.co/100");
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
            <div className="p-3 rounded-md text-sm bg-red-100 text-red-700">
              {state.message}
            </div>
          )}

          <FormField
            id="type"
            name="type"
            label="Payment Type"
            placeholder="Enter payment type"
            defaultValue={initialData?.type}
            required
            disabled={isPending}
            error={state?.errors?.type}
          />

          <div className="space-y-2">
            <label className="text-sm font-medium leading-none">Avatar</label>
            <div className="flex items-center gap-4">
              {imagePreview && (
                <div className="relative h-20 w-20 overflow-hidden rounded-full border">
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
                accept="image/*"
                onChange={handleImageChange}
                disabled={isPending}
              />
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
