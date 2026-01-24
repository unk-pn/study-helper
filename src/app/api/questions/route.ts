import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

const db = prisma.question;

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user.id;

    if (!userId)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const subjectId = await req.nextUrl.searchParams.get("subjectId");

    if (!subjectId)
      return NextResponse.json(
        { error: "Subject id is not provided" },
        { status: 400 },
      );

    const subject = await prisma.subject.findUnique({
      where: { id: subjectId },
      select: { userId: true },
    });

    if (!subject)
      return NextResponse.json({ error: "Subject not found" }, { status: 404 });

    if (userId !== subject.userId)
      return NextResponse.json({ error: "Access denied" }, { status: 403 });

    const questions = await db.findMany({
      where: {
        subjectId: subjectId,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return NextResponse.json(questions, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to fetch questions" },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { questions, subjectId } = await req.json();

    if (!questions || !Array.isArray(questions) || questions.length === 0)
      return NextResponse.json(
        { error: "Questions array is required" },
        { status: 400 },
      );

    if (!subjectId)
      return NextResponse.json(
        { error: "SubjectId is required" },
        { status: 400 },
      );

    const createdQuestions = await Promise.all(
      questions.map((q) =>
        db.create({
          data: {
            name: q.name,
            answer: q.answer || null,
            subjectId,
          },
        }),
      ),
    );

    return NextResponse.json(createdQuestions, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to fetch questions" },
      { status: 500 },
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    if (!id)
      return NextResponse.json(
        { error: "Id is not provided" },
        { status: 400 },
      );

    const question = await db.findUnique({
      where: { id: id },
    });

    if (!question)
      return NextResponse.json(
        { error: "Question not found" },
        { status: 404 },
      );

    await db.delete({
      where: { id: id },
    });

    return NextResponse.json(
      { message: "Question deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to delete question" },
      { status: 500 },
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { id, name, answer } = await req.json();
    if (!id || !name || !answer)
      return NextResponse.json(
        { error: "Id, name or answer not provided" },
        { status: 400 },
      );

    const question = await db.findUnique({
      where: { id: id },
    });

    if (!question)
      return NextResponse.json(
        { error: "Question not found" },
        { status: 404 },
      );

    const updatedQuestion = await db.update({
      where: { id: id },
      data: { name, answer },
    });

    return NextResponse.json(updatedQuestion, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to update question" },
      { status: 500 },
    );
  }
}
