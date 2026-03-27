import type { ReactNode } from "react";
import { cn } from "@/lib/utils/format";

type CardProps = {
  children: ReactNode;
  className?: string;
};

export default function Card({ children, className }: CardProps) {
  return (
    <div
      className={cn("rounded-3xl border border-white/10 bg-white/5", className)}
    >
      {children}
    </div>
  );
}
