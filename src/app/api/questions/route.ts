import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

const db = prisma.question;

export async function GET(req: NextRequest) {
  try {
    const subjectId = await req.nextUrl.searchParams.get("subjectId");

    if (!subjectId)
      return NextResponse.json(
        { error: "Subject id is not provided" },
        { status: 400 }
      );

    const questions = await db.findMany({
      where: {
        subjectId: subjectId,
      },
    });

    return NextResponse.json(questions, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to fetch questions" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { name, subjectId } = await req.json();

    if (!name || !subjectId)
      return NextResponse.json(
        { error: "Name ans SubjectId is required" },
        { status: 400 }
      );

    const newQuestion = await db.create({
      data: {
        name,
        subjectId,
      },
    });

    return NextResponse.json(
      { message: "Question added successfully", question: newQuestion },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to fetch questions" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    if (!id)
      return NextResponse.json(
        { error: "Id is not provided" },
        { status: 400 }
      );

    const question = await db.findUnique({
      where: { id: id },
    });

    if (!question)
      return NextResponse.json(
        { error: "Question not found" },
        { status: 404 }
      );

    await db.delete({
      where: { id: id },
    });

    return NextResponse.json(
      { message: "Question deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to delete question" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { id, answer } = await req.json();
    if (!id || !answer)
      return NextResponse.json(
        { error: "Id or answer not provided" },
        { status: 400 }
      );

    const question = await db.findUnique({
      where: { id: id },
    });

    if (!question)
      return NextResponse.json(
        { error: "Question not found" },
        { status: 404 }
      );

    await db.update({
      where: { id: id },
      data: { answer },
    });

    return NextResponse.json(
      { message: "Question updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to update question" },
      { status: 500 }
    );
  }
}
