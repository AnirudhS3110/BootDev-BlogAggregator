import { createFeed } from "src/lib/db/queries/feeds";


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
 }   
 catch(e)
 {
    if(e instanceof Error)
        console.log(e.message);
    process.exit(1);
 }
}