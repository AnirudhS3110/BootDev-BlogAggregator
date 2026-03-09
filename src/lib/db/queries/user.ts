import { eq, Name } from "drizzle-orm";
import { db } from "..";
import { users } from "../schema";

export async function createUser(name:string)
{
    try{
        const userExist = await getUser(name);
        if(userExist)
            throw new Error("User already exists in the Database!");
        const [result] = await db.insert(users).values({name:name}).returning();
        return result;
    }
    catch(e)
    {
        if(e instanceof Error)
            console.log(e.message);
        process.exit(1);
    }
}

export async function getUser(name:string)
{
    const result = await db.select().from((users)).where(eq(users.name,name));
    return result[0];
}

export async function getAllUsers()
{
    const result = await db.select({name:users.name}).from(users);
    return result.map(user=>user.name);
}