import { getAllPosts } from "@/lib/markdown";
import Link from "next/link";

export default async function HomePage() {
  const posts = await Promise.resolve(getAllPosts()); // 비동기로 데이터를 처리

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
      {/* 헤더 */}
      <header className="sticky top-0 bg-gray-800 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 py-4 flex justify-between items-center">
          <h1 className="text-xl sm:text-2xl font-bold text-blue-500">
            Gomminjae <span className="text-white">Blog</span>
          </h1>
          <button className="text-sm sm:text-base text-gray-300 hover:text-blue-400">
            Menu
          </button>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 py-12 text-center">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-6">
          Welcome to <span className="text-blue-500">My Tech Blog</span>
        </h1>
        <p className="text-base sm:text-lg text-gray-300 mb-12">
          공부한 내용을 기록합니다.
        </p>

        {/* 블로그 글 리스트 */}
        <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <div
              key={post.slug}
              className="bg-gray-800 border border-gray-700 rounded-lg p-6 shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition duration-300"
            >
              <h3 className="text-xl font-semibold text-blue-400 mb-4">
                {post.metadata.title}
              </h3>
              <p className="text-sm text-gray-400 mb-6">
                {post.metadata.description}
              </p>
              <Link
                href={`/article/${post.slug}`}
                className="text-blue-500 hover:text-blue-400 font-medium"
              >
                Read More →
              </Link>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
