import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getUserCredits } from "@/services/database";

export async function GET(req: Request) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userData = await getUserCredits(userId);

    return NextResponse.json({ user: userData });

  } catch (error: any) {
    console.error("[API_USER_ERROR]", error);
    
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
