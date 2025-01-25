import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "posts");

interface Post {
  slug: string;
  metadata: Record<string, any>; // Frontmatter 데이터
}

interface PostDetail extends Post {
  content: string; // Markdown 본문 내용
}

// 모든 게시물을 가져오는 함수
export function getAllPosts(): Post[] {
  const filenames = fs.readdirSync(postsDirectory);

  return filenames.map((filename) => {
    const filePath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data } = matter(fileContents);

    return {
      slug: filename.replace(/\.md$/, ""), // .md 확장자 제거
      metadata: data, // Frontmatter 데이터
    };
  });
}

// 특정 슬러그의 게시물을 가져오는 함수
export function getPostBySlug(slug: string): PostDetail {
  const filePath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug,
    metadata: data, // Frontmatter 데이터
    content, // Markdown 본문 내용
  };
}
