import { XMLParser } from "fast-xml-parser";
import { RSSFeed, RSSItem, State } from "./types";
import { exit } from "node:process";


export async function fetchFeed(feedURL:string):Promise<RSSFeed>
{
    try{
        const response = await fetch(feedURL, {
        headers: {
            "User-Agent": "gator"
        }
        });

        const content = await response.text();

        const xmlParser = new XMLParser();
        const obj = xmlParser.parse(content);

        
        if(!obj.rss.channel)
            throw new Error("Channel doesnt exist");

        const channel = obj.rss.channel;
        
        if( !channel.link || !channel.description || !channel.title)
            throw new Error("Required Fields doesnt inside Channel");
        const {title,link,description} = channel;

        let items:any[] = [];
        if(channel.item)
        {
            items = (Array.isArray(channel.item)) ? channel.item : [channel.item];
        }
        
        let parsedItems:RSSItem[] = [];
        for(const item of items)
        {
            const {title,link,description,pubDate} = item;
            
            if(!title || !link || !description ||!pubDate)
                throw new Error(`Required fileds are not present in ${item}`);
            
            parsedItems.push({
                title:title,
                link:link,
                description:description,
                pubDate:pubDate
            })
        }
        return {
            channel:{
                title:title,
                link:link,
                description:description,
                item:parsedItems
            }
        }
    }catch(e)
    {
        if(e instanceof Error)
            console.log(e.message);
        process.exit(1);
    }
}

export function errorHandler(e:unknown)
{
    if(e instanceof Error)
        console.log(e.message);
    exit(1);
}

