import { db } from "src/lib/db";
import { users } from "src/lib/db/schema";

export default async function resetHandler(cmdName:string, ...args:string[]):Promise<void>
{
    try{
        if(args.length > 0)
            throw new Error("Invalid reset cmd");
        await db.delete(users);
        console.log("DB has been reset");
    }
    catch(e)
    {
        if(e instanceof Error)
            console.log(e.message);
        process.exit(1)
    }
} 