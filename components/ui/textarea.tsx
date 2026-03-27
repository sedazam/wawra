import type { TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils/format";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export default function Textarea({ className, ...props }: TextareaProps) {
  return (
    <textarea
      className={cn(
        "min-h-[120px] w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-500 focus:border-amber-400/60",
        className,
      )}
      {...props}
    />
  );
}
