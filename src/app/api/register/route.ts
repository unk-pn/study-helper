import { prisma } from "@/lib/db";
import { sendEmail } from "@/lib/sendEmail";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

const db = prisma.user;

export async function POST(req: NextRequest) {
  try {
    const { email, password, name } = await req.json();

    if (!email || !password || !name)
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );

    const userExist = await db.findUnique({
      where: { email },
    });

    if (userExist)
      return NextResponse.json(
        { error: "User already exist" },
        { status: 409 }
      );

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await db.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });

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
      await sendEmail(user.email, code.code);
    } catch {
      await prisma.user.delete({
        where: { id: user.id },
      });
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
    console.log("Registration error: ", error);
    return NextResponse.json({ error: "Registration error" }, { status: 500 });
  }
}
