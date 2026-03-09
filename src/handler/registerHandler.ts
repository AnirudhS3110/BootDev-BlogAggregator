import { createUser } from "src/lib/db/queries/user";
import handlerLogin from "./loginHandler";

export default async function registerHandler(cmdName:string, ...args:string[]):Promise<void> 
{
    try
    {
        if(args.length <1)
            throw new Error("Enter valid name");

        const user = await createUser(args[0]);
        if(!user)
            throw new Error("Error while registering in DB");
        console.log(`${args[0]} registered Successfully`); 
        await handlerLogin("login",args[0]); 
    }
    catch(e)
    {
        if(e instanceof Error)
        {
            console.log(e.message);
            process.exit(1); 
        }
        
    }
}