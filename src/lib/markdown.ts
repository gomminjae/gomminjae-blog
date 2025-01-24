import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "posts");

export async function getPostBySlug(slug: string) {
    const filePath = path.join(postsDirectory, '${slug}.md');
    const fileContents = fs.readFileSync(filePath, "utf8");

    const { data, content } = matter(fileContents);
    const processedContent = await remark().use(html).process(content);
    const contentHtml = processedContent.toString();

    return {
        slug,
        meta: data,
        contentHtml,
    }
}

export function getAllPosts() {
    const fileNames = fs.readdirSync(postsDirectory);

    return fileNames.map((fileName) => {
        const slug = fileName.replace(/\.md$/, "");
        const filePath = path.join(postsDirectory,fileName);
        const fileContents = fs.readFileSync(filePath, "utf-8");

        const {data} = matter(fileContents);

        return {
            slug,
            meta: data,
        };
    });
}