import { state } from "src/state";
import { errorHandler } from "src/utils";
import { db } from "..";
import { feed_follow, feeds, users } from "../schema";
import { eq,and, inArray } from "drizzle-orm";

export async function createFeedFollow(feedUrl:string)
{
    const userID = state.userId;
    try{
        const feedID = await db.select().from(feeds).where(eq(feeds.url,feedUrl));
        if(feedID.length <1)
            throw new Error("Invalid feed link");
        const [newFeed] = await db.insert(feed_follow).values({user_id:userID,feed_id:feedID[0].id}).returning();
        const [infos] = await db.select().from(feed_follow).where(eq(feed_follow.id,newFeed.id)).innerJoin(users,eq(users.id,feed_follow.user_id)).innerJoin(feeds,eq(feeds.id,feed_follow.feed_id));
        return infos;
    }
    catch(e)
    {
        errorHandler(e);
    }
}

export async function getAllFeeds()
{
    try{
        const feedFollows = await db.select().from(feed_follow).innerJoin(users,eq(users.id,feed_follow.user_id)).innerJoin(feeds,eq(feeds.id,feed_follow.feed_id));
        return feedFollows;
    }
    catch(e)
    {
        errorHandler(e);
    }
}

export async function getFeedFollowsForUser()
{
    try{
        const userID = state.userId;
        const following = await db.select({feedName:feeds.name}).from(feed_follow).where(eq(feed_follow.user_id,userID)).innerJoin(feeds,eq(feeds.id,feed_follow.feed_id));
        return following;
    }
    catch(e)
    {
        errorHandler(e);
    }
}

export async function deleteFeedFollowing(feedUrl:string)
{
    try{
        const userID = state.userId;
        const [deletedRec] = await db.delete(feed_follow).where(and(eq(feed_follow.user_id,userID), inArray(
            feed_follow.feed_id , 
            db.select({id:feeds.id}).from(feeds).where(eq(feeds.url,feedUrl))))).returning();
        return deletedRec;
    }
    catch(e)
    {
        errorHandler(e);
    }
}