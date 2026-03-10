import { getFeedFollowsForUser } from "src/lib/db/queries/feed_follow";
import { errorHandler } from "src/utils";

export default async function followingHandler(cmdName:string , ...args:string[])
{
    try{
        if(args.length >1)
            throw new Error("Invalid arguements")
        
        const following = await getFeedFollowsForUser();
        if(!following)
            throw new Error("DB error");

        console.log("List of Feeds you are Following")
        for(const feed of following)
            console.log(feed.feedName);
    }
    catch(e)
    {
        errorHandler(e);
    }
}