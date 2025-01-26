import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-gray-800 text-gray-100 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 py-4 flex justify-between items-center">
        <h1 className="text-xl sm:text-2xl font-bold">
          <Link href="/">Gomminjae</Link>
        </h1>
        <nav className="space-x-4">
          <Link href="/" className="text-lg font-bold hover:text-blue-400">
            Home
          </Link>
          <Link href="/blog" className="text-lg font-bold hover:text-blue-400">
            Blog
          </Link>
          <Link href="/about" className="text-lg font-bold hover:text-blue-400">
            About
          </Link>

        </nav>
      </div>
    </header>
  );
}
