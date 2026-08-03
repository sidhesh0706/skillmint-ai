import { clsx } from "clsx";
import type { TextareaHTMLAttributes } from "react";
import { controlStyles } from "@/components/ui/input";

export function Textarea({
  className,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={clsx(controlStyles, "min-h-28 resize-y leading-6", className)}
      {...props}
    />
  );
}
