import fs from "fs";
import { configPath } from "src/config";
import { getAllUsers } from "src/lib/db/queries/user";

export default async function usersHandler(cmdName:string, ...args:string[]):Promise<void>
{
    const curr = JSON.parse(fs.readFileSync(configPath,'utf-8')).currentUserName;
    const users = await getAllUsers();
    users.forEach((user)=>(user === curr) ? console.log(`* ${user} (current)`):console.log(`* ${user}`));
}