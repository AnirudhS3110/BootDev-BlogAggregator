import { createFeedFollow } from "src/lib/db/queries/feed_follow";
import { createFeed } from "src/lib/db/queries/feeds";
import followHandler from "../followHandlers/followHandler";


export default async function addfeedHandler(cmdName:string , ...args:string[]):Promise<void>
{
 try{
    if(args.length < 2)
        throw new Error("Missing parameters");
    
    const name = args[0];
    const url = args[1];

    const result = await createFeed(name,url);

    if(!result)
        throw new Error("Feed was not created");
    console.log("Feed was created");
    await followHandler("follow",url);
 }   
 catch(e)
 {
    if(e instanceof Error)
        console.log(e.message);
    process.exit(1);
 }
}