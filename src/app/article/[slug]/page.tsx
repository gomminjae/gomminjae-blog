import { getPostBySlug, getAllPosts } from "@/lib/markdown";
import { remark } from "remark";
import remarkHtml from "remark-html";

// `generateStaticParams` 함수에서 반환 타입 정의
export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// 서버 컴포넌트에서 사용되는 타입 정의
interface Props {
  params: {
    slug: string;
  };
}

// 서버 컴포넌트 구현
export default async function PostPage({ params }: Props) {
  const post = getPostBySlug(params.slug);

  // Markdown을 HTML로 변환
  const processedContent = await remark().use(remarkHtml).process(post.content);
  const contentHtml = processedContent.toString();

  return (
    <div className="max-w-3xl mx-auto py-12">
      <h1 className="text-4xl font-bold mb-6">{post.metadata.title}</h1>
      <p className="text-gray-600 mb-4">{post.metadata.date}</p>
      <div
        className="prose prose-lg text-gray-700"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />
    </div>
  );
}
