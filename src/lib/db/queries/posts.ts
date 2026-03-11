import { RSSItem } from "src/types";
import { db } from "..";
import { posts } from "../schema";
import { desc } from "drizzle-orm";

export async function createPosts(rssItem:RSSItem, feedId:string) 
{
    const [newPost] = await db.insert(posts).values({
        createdAt: new Date(),
        updatedAt: new Date(),
        title:rssItem.title,
        url:rssItem.link,
        description:rssItem.description ??  "",
        published_at:rssItem.pubDate ? new Date(rssItem.pubDate) : null,
        feed_id:feedId
    }).returning()
}


export async function getPostsForUser(limit:number)
{
    const recentPosts = await db.select().from(posts).orderBy(desc(posts.published_at)).limit(limit);
    return recentPosts;
}