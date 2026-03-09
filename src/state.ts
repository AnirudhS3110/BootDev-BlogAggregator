import { State } from "./types";
import { readConfig } from "./config";
import { db } from "./lib/db";
import { users } from "./lib/db/schema";
import { eq, ne } from "drizzle-orm";

export const state:State = {
    user:"",
    userId:""
};

export async function initState():Promise<void>
{
    try{
        //@ts-ignore
        const username:string = readConfig().currentUserName;
        
        const result = await  db.select().from(users).where(eq(users.name,username));
        
        console.log(result);
       if(result.length >= 1)
       {
        state.user = username;
        state.userId = result[0].id;
        console.log(state.userId);
        console.log("Completed Initialiaing state");
       }
        
        
    }
    catch(e)
    {
        if( e instanceof Error)
            console.log(e.message);
        process.exit(1);
    }
}

export function setState(newState:State)
{
    state.user = newState.user ;
    state.userId = newState.userId;
}