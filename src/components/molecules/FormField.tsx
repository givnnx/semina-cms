import * as React from "react";
import { Input } from "../atoms/Input";
import { cn } from "@/lib/utils";

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string[];
}

const FormField = React.forwardRef<HTMLInputElement, FormFieldProps>(
  ({ className, label, error, id, ...props }, ref) => {
    return (
      <div className={cn("space-y-2", className)}>
        <label
          htmlFor={id}
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {label}
        </label>
        <Input id={id} ref={ref} {...props} />
        {error && <p className="text-sm text-red-500">{error[0]}</p>}
      </div>
    );
  },
);
FormField.displayName = "FormField";

export { FormField };
