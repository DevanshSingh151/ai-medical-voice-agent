import { db } from "@/utils/db";
import { users } from "@/utils/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const email = user.emailAddresses[0]?.emailAddress;
    const name = `${user.firstName || ""} ${user.lastName || ""}`.trim() || "User";

    // Check if user exists
    const existingUser = await db.select().from(users).where(eq(users.email, email));

    if (existingUser.length > 0) {
      return NextResponse.json(existingUser[0]);
    }

    // Insert new user
    const newUser = await db
      .insert(users)
      .values({
        name,
        email,
        credits: 10,
      })
      .returning();

    return NextResponse.json(newUser[0]);
  } catch (error) {
    console.error("Error in /api/users:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
