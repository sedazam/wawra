import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils/format";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export default function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-500 focus:border-amber-400/60",
        className,
      )}
      {...props}
    />
  );
}
