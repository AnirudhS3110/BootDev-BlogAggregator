import { getPostsForUser } from "src/lib/db/queries/posts";
//@ts-ignore
import { htmlToText } from "html-to-text";

export default async function browseHandler(cmdName:string , ...args:string[]) 
{
    let limit:number = 2;

    if(args.length > 0 && !isNaN(Number(args[0])))
        limit = Number(args[0]);

    const recentPosts = await getPostsForUser(limit);

    if(recentPosts.length === 0)
    {
        console.log("No recent posts...")
       return;
    }

    console.log("Recent Posts for You:\n");
    recentPosts.forEach((post,index)=>{
       
        console.log("------------------------");
        console.log(`Post ${index+1}`);
        console.log(`title: ${post.title}`);
        console.log(`link: ${post.url}`);
    })

}