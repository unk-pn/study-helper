import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

const db = prisma.subject;

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    const id = session?.user.id;

    if (!id)
      return NextResponse.json(
        { error: "ID is not provided" },
        { status: 400 }
      );

    const subjects = await db.findMany({
      where: {
        userId: id,
      },
    });
    if (!subjects)
      return NextResponse.json(
        { error: "Ошибка получения предметов" },
        { status: 500 }
      );

    return NextResponse.json(subjects, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Error fetching subjects" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { name, userId, date } = await req.json();
    if (!name || !userId || !date)
      return NextResponse.json(
        { error: "Something is missing: name, date or userId" },
        { status: 400 }
      );

    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime()))
      return NextResponse.json(
        { error: "Invalid date format" },
        { status: 400 }
      );

    const createdSubject = await db.create({
      data: {
        name,
        userId,
        examDate: parsedDate,
      },
    });

    return NextResponse.json(
      { message: "Предмет успешно добавлен", subject: createdSubject },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Error posting subjects" },
      { status: 500 }
    );
  }
}
