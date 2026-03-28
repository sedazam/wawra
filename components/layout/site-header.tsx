import Link from "next/link";
import PageContainer from "./page-container";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 backdrop-blur-md">
      <PageContainer className="flex h-16 items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-4 text-2xl font-extrabold tracking-tight text-white"
        >
          <img
            src="/logo.png"
            alt="Wawra Logo"
            className="h-20 w-20 object-contain filter invert"
          />
          <span className="hidden sm:inline">Wawra</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <Link href="/" className="text-sm text-zinc-300 hover:text-white">
            Home
          </Link>
          <Link
            href="/browse"
            className="text-sm text-zinc-300 hover:text-white"
          >
            Browse
          </Link>
          <Link
            href="/admin"
            className="text-sm text-zinc-300 hover:text-white"
          >
            Admin
          </Link>
        </nav>
      </PageContainer>
    </header>
  );
}
