import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils/format";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
};

export default function Button({
  children,
  className,
  variant = "primary",
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-medium transition";
  const variants = {
    primary: "bg-amber-500 text-black hover:bg-amber-400",
    secondary: "border border-white/10 bg-white/5 text-white hover:bg-white/10",
    ghost: "text-white hover:bg-white/10",
  };

  return (
    <button className={cn(base, variants[variant], className)} {...props}>
      {children}
    </button>
  );
}
