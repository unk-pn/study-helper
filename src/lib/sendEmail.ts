import { EmailTemplate } from "@/components";
import { EmailTemplateProps } from "@/components/EmailTemplate";
import { Resend } from "resend";
import i18n from "i18next";
import { createElement } from "react";

const resend = new Resend(process.env.RESEND_API_KEY);
const email = process.env.RESEND_MAIL;

export const sendEmail = async (
  type: EmailTemplateProps["type"],
  to: string,
  code: string,
) => {
  try {
    const { data, error } = await resend.emails.send({
      from: `unk <mail@${email}>`,
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
