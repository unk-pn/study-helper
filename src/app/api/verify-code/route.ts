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

    await prisma.user.update({
      where: { email },
      data: {
        emailVerified: new Date(),
      },
    });

    await prisma.verificationCode.delete({
      where: {
        id: dbCode.id,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Email verified successfully",
    });
  } catch (error) {
    console.log("Error verifying code: ", error);
    return NextResponse.json(
      { error: "Failed to verify code" },
      { status: 500 }
    );
  }
}
