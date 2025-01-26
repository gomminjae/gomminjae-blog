import { getAllPosts } from "@/lib/markdown";
import Link from "next/link";

export default function HomePage() {
  const posts = getAllPosts(); // 동기적으로 데이터 가져오기

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
      {/* 메인 콘텐츠 */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 py-12 text-center">
        {/* 블로그 글 리스트 */}
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <div
              key={post.slug}
              className="group relative bg-gray-800 border border-gray-700 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition transform hover:-translate-y-1"
            >
              {/* 이미지 또는 대체 영역 */}
              <div className="relative h-48 flex items-center justify-center bg-gray-700">
                {post.metadata.image ? (
                  <img
                    src={post.metadata.image}
                    alt={post.metadata.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-gray-400">
                    <span className="text-lg font-semibold">No Image</span>
                    <span className="text-sm">Available</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-75 group-hover:opacity-50 transition-opacity"></div>
              </div>

              {/* 텍스트 영역 */}
              <div className="relative p-6">
                <h3 className="text-xl font-semibold text-gray-100 group-hover:text-blue-400">
                  {post.metadata.title}
                </h3>
                <p className="text-sm text-gray-400 mt-2 mb-4 line-clamp-3">
                  {post.metadata.description}
                </p>
                <Link
                  href={`/article/${post.slug}`}
                  className="inline-block text-sm font-medium text-blue-400 hover:text-blue-300 mt-2"
                >
                  Read More →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
