import { db } from "src/lib/db";
import { feeds } from "src/lib/db/schema";
import { state } from "src/state";
import { Feed, User } from "src/types";

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



export function printFeed(feed:Feed , user:User)
{

}