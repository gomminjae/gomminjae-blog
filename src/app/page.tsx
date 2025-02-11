import { getAllPosts } from "@/lib/markdown";
import BlogList from "./components/BlogList";

export default function HomePage() {
  const posts = getAllPosts(); // 서버에서 Markdown 파일 읽기

  return <BlogList posts={posts} />;
}