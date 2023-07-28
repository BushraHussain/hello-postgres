import { db } from '@vercel/postgres';
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const client = await db.connect();
 
  try {
    //await client.sql`CREATE TABLE Petos ( Name varchar(255), Owner varchar(255) );`;
    const names = ['Fionaaal', 'Luco'];
    await client.sql`INSERT INTO Petos (Name, Owner) VALUES (${names[0]}, ${names[1]});`;
  } catch (error) {
    return NextResponse.json({ error }, {
        status: 500,
      });
  }

  const petosResult = await client.query('SELECT * FROM Petos;');
  const petos = petosResult.rows;

  return NextResponse.json({ petos });
  }