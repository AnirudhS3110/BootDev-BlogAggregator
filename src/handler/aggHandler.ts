import { getNextFeedToFetch, markFeedFetched } from "src/lib/db/queries/feeds";
import { createPosts } from "src/lib/db/queries/posts";
import { fetchFeed } from "src/utils";

export default async function aggHandler(cmdName:string , ...args:string[])
{
        if (args.length < 1)
        {
            console.log("Enter the interval time!");
            process.exit(1);
        }

        const regex = /^(\d+)(ms|s|m|h)$/;
        const timer = args[0].match(regex);

        if (!timer) 
        {
            console.log("Invalid time format");
            process.exit(1);
        }

        console.log(`Collecting feeds every ${args[0]}`);

        const timerInterval =(timer[2]==="ms") ? Number(timer[1]) : (timer[2]==='s') ? Number(timer[1])*1000 : (timer[2] == 'm') ? Number(timer[1])*1000*60 : Number(timer[1])*1000*60*60;

        scrapeFeeds().catch(errorHandler2);

        const interval = setInterval(()=>scrapeFeeds().catch(errorHandler2),timerInterval);

        await new Promise<void>((resolve) => {
            process.on("SIGINT", () => {
            console.log("Shutting down feed aggregator...");
            clearInterval(interval);
            resolve();
            });
        });
}

export async function scrapeFeeds()
{
        const nextFeed = await getNextFeedToFetch();
        if (!nextFeed) {
            console.log("No feeds found.");
            return;
        }

        await markFeedFetched(nextFeed.id);

        const url = nextFeed.url;
        const feed = await fetchFeed(url);

        console.log(`Fetching posts from ${nextFeed.name}`)
        feed.channel.item.forEach((obj)=>createPosts(obj,nextFeed.id));
}

function errorHandler2(e:unknown)
{
    if (e instanceof Error) {
    console.log(e.message);
  }
}