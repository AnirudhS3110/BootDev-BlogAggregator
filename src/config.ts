import os from "os";
import path from "path";
import fs, { fdatasync } from "fs";
import { CommandHandler, CommandRegistry } from "./commandHandler";

export type Config = {
    dbUrl:string;
    currentUserName?:string
}

const configPath = path.join(os.homedir(), ".gatorconfig.json");

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

export function runCommand(registry:CommandRegistry , cmdName:string, ...args:string[])
{
    registry[cmdName](cmdName,...args);
}