import { getPostBySlug } from "@/lib/markdown";
import { remark } from "remark";
import remarkHtml from "remark-html";

export default async function PostPage({ params }: { params: Promise<{ slug: string }>  }) {
  const slug = (await params).slug; 
  if (!slug) {
    throw new Error("Slug is missing in params");
  }

  const post = getPostBySlug(slug);

  if (!post) {
    throw new Error(`Post not found for slug: ${slug}`);
  }

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
