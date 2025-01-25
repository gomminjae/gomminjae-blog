import { getPostBySlug, getAllPosts } from "@/lib/markdown";
import { remark } from "remark";
import remarkHtml from "remark-html";

// `generateStaticParams` 함수에서 반환 타입 정의
export async function generateStaticParams() {
  const posts = getAllPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

interface PostPageProps {
  params: {
    slug: string;
  };
}

export default async function PostPage({ params }: PostPageProps) {
  if (!params?.slug) {
    throw new Error("Slug is missing in params");
  }

  const post = getPostBySlug(params.slug);

  const processedContent = await remark().use(remarkHtml).process(post.content);
  const contentHtml = processedContent.toString();

  return (
    <article className="max-w-3xl mx-auto py-12">
      <h1 className="text-4xl font-bold mb-6">{post.metadata.title}</h1>
      <p className="text-gray-600 mb-4">{post.metadata.date}</p>
      <div
        className="prose prose-lg text-gray-700"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />
    </article>
  );
}