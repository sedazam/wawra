"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { label: "Dashboard", href: "/admin" },
  { label: "Upload Audio", href: "/admin/upload" },
  { label: "Manage Audios", href: "/admin/audios" },
  { label: "Categories", href: "/admin/categories" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full rounded-3xl border border-white/10 bg-white/5 p-4 md:w-72 md:p-5">
      <div className="mb-6">
        <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
          Wawra Admin
        </p>
        <h2 className="mt-2 text-xl font-bold text-white">Control Panel</h2>
      </div>

      <nav className="space-y-2">
        {links.map((link) => {
          const active = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`block rounded-2xl px-4 py-3 text-sm transition ${
                active
                  ? "bg-amber-500 text-black"
                  : "text-zinc-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
