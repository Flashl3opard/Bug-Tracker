import dbConnect from "@/lib/dbConnect";
import Issue from "@/models/issues";

export async function POST(req: { json: () => any; }) {
  try {
    await dbConnect();
    const data = await req.json();
    const newIssue = await Issue.create(data);
    return Response.json(newIssue, { status: 201 });
  } catch (error) {
    console.error("POST Error:", error);
    return Response.json({ error: "Issue creation failed" }, { status: 500 });
  }
}

export async function GET() {
  try {
    await dbConnect();
    const issues = await Issue.find().sort({ createdAt: -1 });
    return Response.json(issues);
  } catch (error) {
    console.error("GET Error:", error);
    return Response.json({ error: "Fetching issues failed" }, { status: 500 });
  }
}