import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { getPublishedPosts } from "../lib/content";

export async function GET(context: { site: string }) {
  const posts = getPublishedPosts(await getCollection("blog"));

  return rss({
    title: "Jasper Deen",
    description: "Writing from Jasper Deen.",
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description || undefined,
      link: `/${post.collection}/${post.id}/`,
      pubDate: post.data.pubDate,
      categories: post.data.tags,
    })),
  });
}