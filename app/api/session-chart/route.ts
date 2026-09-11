import { db } from "@/utils/db";
import { sessionChart } from "@/utils/schema";
import { currentUser } from "@clerk/nextjs/server";
import { desc, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const email = user.emailAddresses[0]?.emailAddress;
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get("sessionId");

    if (sessionId === "all") {
      const allSessions = await db
        .select()
        .from(sessionChart)
        .where(eq(sessionChart.createdBy, email))
        .orderBy(desc(sessionChart.id));
      return NextResponse.json(allSessions);
    }

    if (sessionId) {
      const singleSession = await db
        .select()
        .from(sessionChart)
        .where(eq(sessionChart.sessionId, sessionId));
      return NextResponse.json(singleSession[0] || null);
    }

    return NextResponse.json({ error: "Missing sessionId" }, { status: 400 });
  } catch (error) {
    console.error("Error GET /api/session-chart:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const email = user.emailAddresses[0]?.emailAddress;
    const body = await req.json();
    const { notes, selectedDoctor, sessionId } = body;

    const newSession = await db
      .insert(sessionChart)
      .values({
        sessionId,
        createdBy: email,
        notes,
        selectedDoctor,
        conversation: [],
        report: null,
      })
      .returning();

    return NextResponse.json(newSession[0]);
  } catch (error) {
    console.error("Error POST /api/session-chart:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
