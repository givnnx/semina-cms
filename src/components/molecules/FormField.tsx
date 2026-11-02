import * as React from "react";
import { Input } from "../atoms/Input";
import { cn } from "@/lib/utils";

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string[];
}

const FormField = React.forwardRef<HTMLInputElement, FormFieldProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const reactId = React.useId();
    const fieldId = id || reactId;
    const hasError = Boolean(error && error.length > 0);

    return (
      <div className={cn("space-y-2", className)}>
        <label
          htmlFor={fieldId}
          className="text-sm font-medium leading-none text-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {label}
        </label>
        <Input
          id={fieldId}
          ref={ref}
          aria-invalid={hasError}
          aria-describedby={hasError ? `${fieldId}-error` : undefined}
          {...props}
        />
        {hasError && (
          <p
            id={`${fieldId}-error`}
            role="alert"
            className="text-sm font-medium text-destructive"
          >
            {error![0]}
          </p>
        )}
      </div>
    );
  },
);
FormField.displayName = "FormField";

export { FormField };
