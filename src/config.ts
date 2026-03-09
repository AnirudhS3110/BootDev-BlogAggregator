import os from "os";
import path from "path";
import fs from "fs";
import { CommandHandler, CommandRegistry } from "./types";

export type Config = {
    dbUrl:string;
    currentUserName?:string
}



export const configPath = path.join(os.homedir(), ".gatorconfig.json");

export function setUser(currentUserName:string):void
{
 const content = fs.readFileSync(configPath,'utf-8');

 const parsed = JSON.parse(content);
 parsed["currentUserName"] = currentUserName;

 fs.writeFileSync(configPath,JSON.stringify(parsed));
}


export function readConfig():Config
{
    const parsed= JSON.parse(fs.readFileSync(configPath,'utf-8'));
    return {
        dbUrl:parsed.db_url,
        currentUserName:parsed.currentUserName
    }
}

export function registerCommand(registry:CommandRegistry, cmdName:string, handler:CommandHandler):void
{
    registry[cmdName] = handler;
}

export async function runCommand(registry:CommandRegistry , cmdName:string, ...args:string[])
{
    await registry[cmdName](cmdName,...args);
}