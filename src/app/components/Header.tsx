import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="bg-gray-800 text-gray-100 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 py-4 flex justify-between items-center">
        <h1 className="text-xl sm:text-2xl font-bold">
          <Link href="/">Gomminjae</Link>
        </h1>
        <nav className="flex items-center space-x-6">
          <Link href="/" className="text-lg font-bold hover:text-blue-400">
            Home
          </Link>
          <Link href="/blog" className="text-lg font-bold hover:text-blue-400">
            Posts
          </Link>
          <Link href="/about" className="text-lg font-bold hover:text-blue-400">
            About
          </Link>
          {/* <Link 
            href="https://github.com/gomminjae" 
            className="flex items-center"
          >
            <Image
              src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
              alt="GitHub"
              width={36}
              height={36}
            />
          </Link> */}
        </nav>
      </div>
    </header>
  );
}
