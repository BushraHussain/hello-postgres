import { db } from "@vercel/postgres";
import { NextResponse, NextRequest } from "next/server";

/**
 * To take input from user and save in Vercel postgres database
 * Step 1: First create the table - added in GET
 * Step 2: Call POST using frontend form
 * 
 * NOTE: Must return a "Response" in the end of each method
*/
export async function GET() {

    const client = await db.connect();

    try {
        //Create table - uncomment it to create a table
        //await client.sql`CREATE TABLE Inputprojects (id SERIAL PRIMARY KEY, Title varchar(255), Description varchar(255) );`;
    }
    catch(error){
        return NextResponse.json({ error }, {
            status: 500,
        });
    }

    const res = await client.sql`SELECT * from Inputprojects`;
    return NextResponse.json({res}); 
}

export async function POST(req:any, res:any){
    const body = await req.json(); // Take JSON of body
    const title = body.title;
    const description = body.description;
    
    try {
        const client = await db.connect();
        await client.sql`INSERT INTO Inputprojects (Title, Description) VALUES (${title},${description});`;
        return NextResponse.json({ message: "This Worked", success: true });
        

    } catch (error) {
        console.error('Error creating project:', error);
        return NextResponse.json({ message: error, success: false });
    }

}