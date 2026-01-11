import { prisma } from "@/lib/db";
import { sendEmail } from "@/lib/sendEmail";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email)
      return NextResponse.json({ error: "Email required" }, { status: 400 });

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user)
      return NextResponse.json({ error: "User not found" }, { status: 404 });

    const verificationCode = Math.floor(Math.random() * 999999)
      .toString()
      .padStart(6, "0");

    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

    const code = await prisma.verificationCode.create({
      data: {
        email: user.email,
        code: verificationCode,
        expiresAt,
      },
    });

    try {
      await sendEmail("passwordChange", user.email, code.code);
    } catch {
      await prisma.verificationCode.delete({
        where: { id: code.id },
      });

      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.log("Error requesting password reset: ", error);
    return NextResponse.json(
      { error: "Failed to request password reset" },
      { status: 500 }
    );
  }
}
