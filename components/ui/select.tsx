import type { SelectHTMLAttributes } from "react";
import { cn } from "@/lib/utils/format";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement>;

export default function Select({ className, children, ...props }: SelectProps) {
  return (
    <select
      className={cn(
        "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-amber-400/60",
        className,
      )}
      {...props}
    >
      {children}
    </select>
  );
}
