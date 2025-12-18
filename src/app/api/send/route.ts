import { EmailTemplate } from "@/components/EmailTemplate/EmailTemplate";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {
  try {
    const { data, error } = await resend.emails.send({
      // from: "unk <unkpn.dev@google.com>",
      from: "unk <onboarding@resend.dev>", // ПОМЕНЯТЬ НА ПРОДАКШН
      to: ["unkpn.dev@gmail.com"],
      subject: "Example email",
      react: EmailTemplate({ firstName: "EXAMPLE EMAIL" }),
    });

    if (error) {
      console.log(error);
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
