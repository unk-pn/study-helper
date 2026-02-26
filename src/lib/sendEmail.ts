import { EmailTemplate } from "@/components";
import { EmailTemplateProps } from "@/components/EmailTemplate";
import { Resend } from "resend";
import { createElement } from "react";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (
  type: EmailTemplateProps["type"],
  to: string,
  code: string,
) => {
  const fromEmail = process.env.RESEND_MAIL || "onboarding@resend.dev";

  try {
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to,
      subject: "Код подтверждения",
      react: createElement(EmailTemplate, { type, code }),
    });

    if (error) {
      console.log(error);
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
