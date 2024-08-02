// lib/mdx.ts

import { serialize } from "next-mdx-remote/serialize";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

export async function serializeMDX(content: string) {
  return await serialize(content, {
    mdxOptions: {
      rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
    },
  });
}
