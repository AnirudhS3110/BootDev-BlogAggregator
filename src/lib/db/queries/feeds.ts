import { db } from "src/lib/db";
import { feeds,users } from "../schema";
import { state } from "src/state";
import { Feed, User } from "src/types";
import { eq, sql } from "drizzle-orm";

export async function createFeed(name:string, url:string)
{
    try{
        if(state.userId == "")
            throw new Error("State is not initialised properly");
        const result = db.insert(feeds).values({name:name,url:url,user_id:state.userId}).returning();
        return result;
    }
    catch(e)
    {
        if(e instanceof Error)
            console.log(e.message)
        process.exit(1);
    }
}

export async function getFeeds()
{
    try{
        const feed = await db.select({name:feeds.name,url:feeds.url,username:users.name}).from(feeds).innerJoin(users,eq(feeds.user_id,users.id));
        return feed;
    }
    catch(e)
    {
        if(e instanceof Error)
            console.log(e.message);
        process.exit(1);
    }
}


export async function markFeedFetched(id:string)
{
    await db.update(feeds).set({last_fetched_at:new Date(),updatedAt:new Date()}).where(eq(feeds.id,id));
}

export async function getNextFeedToFetch()
{
     try{
        const [nextFeed] = await db.select().from(feeds).orderBy(sql`last_fetched_at NULLS FIRST`).limit(1);
     return nextFeed;
     }
     catch(e)
     {
        if(e instanceof Error)
            console.log(e.message);
        throw e; 
     }
}

export function printFeed(feed:Feed , user:User)
{

}