import { CommandRegistry } from "./commandHandler";
import { readConfig, registerCommand, runCommand, setUser } from "./config";
import handlerLogin from "./handler/loginHandler";
import { argv } from "node:process";

function main() {
  const registry:CommandRegistry = {};
  registerCommand(registry,"login",handlerLogin);

  const cargs  = process.argv.slice(2);

  
  if(cargs.length < 1)
  {
    console.log("Nothing entered");
    process.exit(1);
  }
    
  else{
    const [cmd,...args] = cargs;
    runCommand(registry,cmd,...args);
  }
  
}

main();