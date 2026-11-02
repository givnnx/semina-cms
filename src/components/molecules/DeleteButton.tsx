"use client";

import { useActionState, useState } from "react";
import { Button } from "@/components/atoms/Button";
import { ActionState } from "@/app/(dashboard)/categories/actions";

interface DeleteButtonProps {
  action: (id: string) => Promise<ActionState>;
  id: string;
}

export function DeleteButton({ action, id }: DeleteButtonProps) {
  // We need to adapt the action to match useActionState signature
  // The server action is (id: string) -> Promise<ActionState>
  // useActionState expects (state: ActionState, payload: FormData) -> Promise<ActionState>

  const deleteActionWrapper = async (
    prevState: ActionState,
    formData: FormData,
  ) => {
    // ignore formData, just call the delete action
    return await action(id);
  };

  const [confirming, setConfirming] = useState(false);
  const [state, formAction, isPending] = useActionState(deleteActionWrapper, {
    success: false,
    message: "",
  });

  if (!confirming) {
    return (
      <Button
        type="button"
        size="sm"
        variant="danger"
        onClick={() => setConfirming(true)}
      >
        Delete
      </Button>
    );
  }

  return (
    <form
      action={formAction}
      className="inline-flex items-center gap-1"
      onKeyDown={(e) => {
        if (e.key === "Escape") setConfirming(false);
      }}
    >
      <Button size="sm" variant="danger" disabled={isPending}>
        {isPending ? "Deleting..." : "Confirm Delete"}
      </Button>
      <Button
        type="button"
        size="sm"
        variant="outline"
        onClick={() => setConfirming(false)}
        disabled={isPending}
      >
        Cancel
      </Button>
      {state?.message && !state.success && (
        <span className="text-xs font-medium text-destructive ml-1">
          {state.message}
        </span>
      )}
    </form>
  );
}
