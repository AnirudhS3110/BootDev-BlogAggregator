import { title } from "node:process";
import { fetchFeed } from "src/utils";

export default async function aggHandler(cmdName:string , ...args:string[])
{
    try{
        const url ="https://www.wagslane.dev/index.xml";
        const feed = await fetchFeed(url);
        feed.channel.item.forEach((obj)=>console.log(obj));
    }
    catch(e)
    {
        if(e instanceof Error)
            console.log(e.message);
        process.exit(1);
    }
}