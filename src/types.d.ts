
import { feeds, users } from "./lib/db/schema";

export type CommandHandler = (cmdName:string, ...args:string[])=>Promise<void>;
export type CommandRegistry = Record<string,CommandHandler>;


export type RSSFeed = {
  channel: {
    title: string;
    link: string;
    description: string;
    item: RSSItem[];
  };
};

export type RSSItem = {
  title: string;
  link: string;
  description: string;
  pubDate: string;
};

export type State = {
    user:string,
    userId:string
}

export type Feed = typeof feeds.$inferSelect;
export type User = typeof users.$inferSelect;