import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email, code, password } = await req.json();

    if (!email || !code || !password)
      return NextResponse.json(
        { error: "Email, code and password required" },
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

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user)
      return NextResponse.json({ error: "User not found" }, { status: 404 });

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.update({
      where: { email },
      data: {
        password: hashedPassword,
      },
    });

    await prisma.verificationCode.delete({
      where: { id: dbCode.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.log("Error confirming password reset: ", error);
    return NextResponse.json(
      { error: "Failed to reset password" },
      { status: 500 }
    );
  }
}
