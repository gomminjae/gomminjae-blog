import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypePrism from "rehype-prism";

export async function getStaticPaths() {
    const postsDirectory = path.join(process.cwd(), "posts");
    const filenames = fs.readdirSync(postsDirectory);

    const paths = filenames.map((filename) => ({
        params: { slug: filename.replace(".md", "") },
    }));

    return { paths, fallback: false };
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
    const filePath = path.join(process.cwd(), "posts", `${params.slug}.md`);
    const fileContent = fs.readFileSync(filePath, "utf8");

    const { data, content } = matter(fileContent);
    const processedContent = await remark()
        .use(remarkRehype)
        .use(rehypePrism)
        .use(rehypeStringify)
        .process(content);

    const htmlContent = processedContent.toString();

    return {
        props: {
            title: data.title,
            date: data.date,
            content: htmlContent,
        },
    };
}

const PostPage = ({ title, date, content }: { title: string; date: string; content: string }) => {
    return (
        <div className="max-w-3xl mx-auto py-10 px-6">
            <h1 className="text-4xl font-bold mb-4">{title}</h1>
            <p className="text-gray-500 mb-8">{date}</p>
            <div
                className="prose prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: content }}
            ></div>
        </div>
    );
};

export default PostPage;
