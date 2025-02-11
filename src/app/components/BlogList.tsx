"use client"; // 클라이언트 컴포넌트 지정

import Link from "next/link";
import useTagStore from "@/lib/store/useTagStore";

export default function BlogList({ posts }: { posts: any[] }) {
    const { getTagColor, addTagColor } = useTagStore(); // Zustand 사용

    return (
        <div className="min-h-screen bg-gradient-to-br">
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="bg-gradient-to-t overflow-hidden shadow rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                        <div className="space-y-8">
                            {posts.map((post) => (
                                <div key={post.slug} className="border-b pb-8">
                                    {/* 제목 */}
                                    <h2 className="text-2xl font-semibold text-white">
                                        <Link href={`/article/${post.slug}`} className="hover:text-blue-500">
                                            {post.metadata.title}
                                        </Link>
                                    </h2>

                                    {/* 날짜 & 읽기 시간 */}
                                    <div className="mt-2 flex items-center text-sm text-gray-500">
                                        <time dateTime={post.metadata.date}>
                                            {new Date(post.metadata.date).toLocaleDateString()}
                                        </time>
                                        <span className="mx-1">·</span>
                                        <span>{post.metadata.readingTime} min read</span>
                                    </div>

                                    {/* 태그 리스트 */}
                                    <div className="mt-2 flex flex-wrap gap-2">
                                        {post.metadata.tag?.map((tag: string) => {
                                            addTagColor(tag); // Zustand 태그 색상 추가
                                            return (
                                                <span
                                                    key={tag}
                                                    className="px-3 py-1 text-sm font-medium rounded-lg"
                                                    style={{
                                                        backgroundColor: getTagColor(tag),
                                                        color: "#fff",
                                                    }}
                                                >
                                                    #{tag}
                                                </span>
                                            );
                                        })}
                                    </div>

                                    {/* 설명 */}
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
