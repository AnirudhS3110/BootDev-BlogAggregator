import { deleteFeedFollowing } from "src/lib/db/queries/feed_follow";
import { errorHandler } from "src/utils";

export default async function unfollowHandler(cmdName:string,...args:string[])
{
    try{
        if(args.length < 1)
            throw new Error("Please enter the Feed's URL");
        const feedUrl = args[0];

        const unfollowedRec = await deleteFeedFollowing(feedUrl);
        console.log(`Unfollowed ${feedUrl}`);
    }
    catch(e)
    {
        errorHandler(e);
    }
}