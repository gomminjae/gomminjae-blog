import { getAllPosts } from "@/lib/markdown";
import Link from "next/link";

export default function HomePage() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen bg-gradient-to-br">
      {/* Header Section */}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-t overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            {/* Article List */}
            <div className="space-y-8">
              {posts.map((post) => (
                <div key={post.slug} className="border-b pb-8">
                  <h2 className="text-2xl font-semibold text-white">
                    <Link href={`/article/${post.slug}`} className="hover:text-blue-500">{post.metadata.title}</Link>
                  </h2>
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    <time dateTime={post.metadata.date}>
                      {new Date(post.metadata.date).toLocaleDateString()}
                    </time>
                    <span className="mx-1">·</span>
                    <span>{post.metadata.readingTime} min read</span>
                  </div>
                  <p className="mt-4 text-gray-400">{post.metadata.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
