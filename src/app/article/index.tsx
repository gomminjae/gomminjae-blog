import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";

export async function getStaticProps() {
    const postsDirectory = path.join(process.cwd(), "posts");
    const filenames = fs.readdirSync(postsDirectory);

    const posts = filenames.map((filename) => {
        const filePath = path.join(postsDirectory, filename);
        const fileContent = fs.readFileSync(filePath, "utf8");
        const { data } = matter(fileContent);

        return {
            slug: filename.replace(".md", ""),
            title: data.title,
            date: data.date,
        };
    });

    return { props: { posts } };
}

const PostsList = ({ posts }: { posts: { slug: string; title: string; date: string }[] }) => {
    return (
        <div className="max-w-3xl mx-auto py-10 px-6">
            <h1 className="text-4xl font-bold mb-8">Posts</h1>
            <ul className="space-y-4">
                {posts.map((post) => (
                    <li key={post.slug} className="border-b pb-4">
                        <Link href={`/posts/${post.slug}`}>
                            <a className="text-xl font-semibold text-blue-500 hover:underline">
                                {post.title}
                            </a>
                        </Link>
                        <p className="text-gray-500">{post.date}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PostsList;
