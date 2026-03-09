
import { setUser } from "src/config";
import { getUser } from "src/lib/db/queries/user";
import {setState} from "src/state";

export default async function handlerLogin(cmdName:string, ...args:string[]):Promise<void>
{
    try{
        if(args.length === 0)
            throw new Error("Enter Username");

        const name = args[0];
        const user = await getUser(name);
        const doesExist = (user) ? true : false;
        if(!doesExist)
            throw new Error(`Please Register before logging in ${name}`);
        
        setUser(name); // This function writes into the gatorconfig.json file
        setState({user:user.name,userId:user.id});
        console.log(`${name} has been logged in`);
    }catch(err)
    {
       if(err instanceof Error)
             console.log(err.message)
        process.exit(1);
    }
}