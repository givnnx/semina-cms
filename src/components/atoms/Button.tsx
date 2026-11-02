import * as React from "react";
import { cn } from "@/lib/utils";

const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "outline" | "ghost" | "danger" | "success" | "secondary";
    size?: "sm" | "md" | "lg";
  }
>(({ className, variant = "primary", size = "md", ...props }, ref) => {
  const variants = {
    primary: "bg-primary text-primary-foreground hover:bg-primary-hover shadow-xs",
    secondary: "bg-muted-bg text-foreground hover:bg-border",
    outline:
      "border border-input-border bg-surface hover:bg-muted-bg text-foreground",
    ghost: "bg-transparent hover:bg-muted-bg text-foreground",
    danger: "bg-destructive text-destructive-foreground hover:bg-destructive-hover shadow-xs",
    success: "bg-success text-success-foreground hover:bg-success-hover shadow-xs",
  };

  const sizes = {
    sm: "h-8 px-3 text-xs",
    md: "h-10 px-4 py-2",
    lg: "h-12 px-8 text-lg",
  };

  return (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center rounded-md font-medium transition-colors cursor-pointer enabled:active:scale-[0.96] transition-transform duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  );
});
Button.displayName = "Button";

export { Button };
