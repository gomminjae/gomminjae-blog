import React from "react";
import Link from "next/link";
import { getAllPosts } from "@/lib/markdown";

const BlogPage = () => {
    const posts = getAllPosts();

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-6">Blog Page</h1>
            <p className="mb-10 text-lg text-gray-600">Bon Voyage</p>
            <div className="space-y-8">
                {posts.map((post) => (
                    <Link
                        key={post.slug}
                        href={`/article/${post.slug}`}
                        className="block group"
                    >
                        <h2 className="text-2xl font-semibold text-gray-800 group-hover:text-blue-500 transition">
                            {post.metadata.title}
                        </h2>
                        <p className="mt-2 text-gray-600 group-hover:text-gray-800 transition">
                            {post.metadata.description.length > 100
                                ? `${post.metadata.description.slice(0, 100)}...`
                                : post.metadata.description}
                        </p>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default BlogPage;
