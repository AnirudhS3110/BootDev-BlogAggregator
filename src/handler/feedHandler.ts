import { getFeeds } from "src/lib/db/queries/feeds";
import { errorHandler } from "src/utils";

export default async function feedHandler(cmdName:string,...args:string[]):Promise<void>
{
    try{
        if(args.length > 0)
            throw new Error("Invalid Parameters");
        const feeds = await getFeeds();
        console.log("List of feeds:");
        feeds.forEach((item,key)=>console.log(`${key+1}. ${item.username} ${item.name} ${item.url}`));
    }
    catch(e)
    {
        errorHandler(e);
    }
}