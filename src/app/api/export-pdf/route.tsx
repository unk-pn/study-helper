import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { prisma } from "@/lib/db";
import { renderToStream } from "@react-pdf/renderer";
import { QuestionsPDF } from "@/components";

const db = prisma.subject;

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { subjectId } = await req.json();

    const subject = await db.findUnique({
      where: { id: subjectId },
      include: { questions: true },
    });
    if (!subject)
      return NextResponse.json({ error: "Subject not found" }, { status: 404 });

    const stream = await renderToStream(
      <QuestionsPDF questions={subject.questions} subjectName={subject.name} />,
    );

    return new NextResponse(stream as unknown as BodyInit, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename*=UTF-8''${encodeURIComponent(subject.name)}.pdf`,
      },
    });
  } catch (error) {
    console.error("PDF generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate PDF" },
      { status: 500 },
    );
  }
}
