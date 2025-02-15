import { getPostBySlug } from "@/lib/markdown";
import { remark } from "remark";
import remarkHtml from "remark-html";
import hljs from "highlight.js";
import rehypeRaw from "rehype-raw"; 
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug; 
  if (!slug) {
    throw new Error("Slug is missing in params");
  }

  const post = getPostBySlug(slug);

  if (!post) {
    throw new Error(`Post not found for slug: ${slug}`);
  }

  // Markdown을 HTML로 변환
  const processedContent = await remark()
    .use(remarkGfm) // ✅ GFM 지원 (테이블, 체크리스트 등)
    .use(remarkRehype, { allowDangerousHtml: true }) // ✅ HTML 태그 지원
    .use(rehypeRaw) // ✅ raw HTML 태그 처리
    .use(rehypeStringify) // ✅ 최종 HTML 생성
    .process(post.content);
  const contentHtml = processedContent.toString();

  // highlight.js 적용
  const highlightedContent = contentHtml.replace(/<pre><code class="language-(.*?)">(.*?)<\/code><\/pre>/gs, (match, lang, code) => {
    const language = hljs.getLanguage(lang) ? lang : "plaintext"; // 지원되지 않는 언어는 기본값으로
    const highlighted = hljs.highlight(code, { language }).value;
    return `<pre><code class="hljs language-${language}">${highlighted}</code></pre>`;
  });

  return (
    <article className="max-w-3xl mx-auto py-12">
      <h1 className="text-4xl font-bold mb-6">{post.metadata.title}</h1>
      <p className="text-blue-500 mb-4">{post.metadata.date}</p>
      <div
        className="prose prose-lg text-white-700"
        dangerouslySetInnerHTML={{ __html: highlightedContent }}
      />
    </article>
  );
}
