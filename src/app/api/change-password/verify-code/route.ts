import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email, code } = await req.json();

    if (!email || !code)
      return NextResponse.json(
        { error: "Email and code required" },
        { status: 400 }
      );

    const dbCode = await prisma.verificationCode.findFirst({
      where: {
        email,
        code,
        expiresAt: { gte: new Date() },
      },
    });

    if (!dbCode)
      return NextResponse.json(
        { error: "Invalid or expired code" },
        { status: 400 }
      );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.log("Error requesting password reset: ", error);
    return NextResponse.json(
      { error: "Failed to verify code for password reset" },
      { status: 500 }
    );
  }
}
