import { db } from "@vercel/postgres";
import { NextResponse, NextRequest } from "next/server";

export async function GET() {

    const client = await db.connect();

    try {
        // Create table
        //await client.sql`CREATE TABLE Testprojects (id SERIAL PRIMARY KEY, Title varchar(255), Description varchar(255), Category varchar(255), Budget integer );`;

        const data = ["Parrot Website", "This is a parrot website", "Web", 1800];

        await client.sql`INSERT INTO Testprojects (Title, Description, Category, Budget ) VALUES (${data[0]},${data[1]},${data[2]},${data[3]} ); `;
    }
    catch(error){
        return NextResponse.json({ error }, {
            status: 500,
        });
    }

    const res = await client.sql`SELECT * from Testprojects`;

    return NextResponse.json({res});
    
}