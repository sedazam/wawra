import Link from "next/link";
import { FaSearch, FaHome, FaPodcast, FaUser } from "react-icons/fa";

export default function PodcastMenuBar() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-zinc-900 border-t border-white/10 shadow-lg flex justify-around items-center h-16 md:hidden">
      <Link
        href="/"
        className="flex flex-col items-center text-white/80 hover:text-blue-500 transition"
      >
        <FaHome className="text-xl mb-1" />
        <span className="text-xs">Home</span>
      </Link>
      <Link
        href="/browse"
        className="flex flex-col items-center text-white/80 hover:text-blue-500 transition"
      >
        <FaSearch className="text-xl mb-1" />
        <span className="text-xs">Browse</span>
      </Link>
      <Link
        href="/podcasts"
        className="flex flex-col items-center text-white/80 hover:text-blue-500 transition"
      >
        <FaPodcast className="text-xl mb-1" />
        <span className="text-xs">Podcasts</span>
      </Link>
      <Link
        href="/profile"
        className="flex flex-col items-center text-white/80 hover:text-blue-500 transition"
      >
        <FaUser className="text-xl mb-1" />
        <span className="text-xs">Profile</span>
      </Link>
    </nav>
  );
}
