import { createFeedFollow } from "src/lib/db/queries/feed_follow";
import { errorHandler } from "src/utils";

export default async function followHandler(cmdName:string , ...args:string[]) 
{
    try{
        if(args.length < 1)
            throw new Error("Please Enter the URL");
        if(args.length > 1)
            throw new Error("Only one Link is valid");
        const url = args[0];
        const feedFollowInfo = await createFeedFollow(url);
        console.log(`${feedFollowInfo?.users.name} followed ${feedFollowInfo?.feeds.name}!`);
    }
    catch(e)
    {
        errorHandler(e);
    }
}