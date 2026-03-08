
import { setUser } from "src/config";

export default function handlerLogin(cmdName:string, ...args:string[]):void
{
    try{
        if(args.length === 0)
            throw new Error("Enter Username");
        setUser(args[0]); // This function writes into the gatorconfig.json file
        console.log(`${args[0]} has been set`);
    }catch(err)
    {
       if(err instanceof Error)
             console.log(err.message)
        process.exit(1);
    }
}