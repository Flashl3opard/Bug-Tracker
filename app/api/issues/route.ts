import dbConnect from "@/lib/DBconnect";
import Issue from "@/models/issues"; 
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const data = await req.json();

    const newIssue = await Issue.create(data); 

    return NextResponse.json(newIssue, { status: 201 });
  } catch (error) {
    console.error("POST Error:", error);
    return NextResponse.json({ error: "Issue creation failed" }, { status: 500 });
  }
}

export async function GET() {
  try {
    await dbConnect();
    const issues = await Issue.find().sort({ createdAt: -1 });
    return NextResponse.json(issues);
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json({ error: "Fetching issues failed" }, { status: 500 });
  }
}
