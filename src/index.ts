import { CommandRegistry } from "./types";
import { readConfig, registerCommand, runCommand } from "./config";
import handlerLogin from "./handler/loginHandler";
import registerHandler from "./handler/registerHandler";
import resetHandler from "./handler/resetHandler";
import usersHandler from "./handler/usersHandler";
import aggHandler from "./handler/aggHandler";
import addfeedHandler from "./handler/addfeedHandler";
import { initState } from "./state.js";



async function main() {
  const registry:CommandRegistry = {};
  
  registerCommand(registry,"login",handlerLogin);
  registerCommand(registry,"register",registerHandler);
  registerCommand(registry,"reset",resetHandler);
  registerCommand(registry,"users",usersHandler);
  registerCommand(registry,"agg",aggHandler);
  registerCommand(registry,"addfeed",addfeedHandler);
  await initState();

  const cargs  = process.argv.slice(2);

  
  if(cargs.length < 1)
  {
    console.log("Nothing entered");
    process.exit(1);
  }
    
  else{
    
    const [cmd,...args] = cargs;
    
    await runCommand(registry,cmd,...args);
  }
  process.exit(0);
}

main();
