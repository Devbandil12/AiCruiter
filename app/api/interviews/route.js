import { db } from "@/db/db";
import { interviewDetailsTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req) {
    const email= new URL(req.url).searchParams.get("email")

    try {
        
        const res=await db.select().from(interviewDetailsTable).where(eq(interviewDetailsTable.useremail,email))
        return NextResponse.json(res)

    } catch (error) {
        return NextResponse.json("something wrong happens, please try again later")
    }

    
}