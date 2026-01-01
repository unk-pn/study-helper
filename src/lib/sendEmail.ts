import { EmailTemplate } from "@/components/EmailTemplate";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (to: string, code: string) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "unk <onboarding@resend.dev>",
      to,
      subject: "Код верификации",
      react: EmailTemplate({ code }),
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
