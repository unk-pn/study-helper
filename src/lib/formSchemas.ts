import { z } from "zod";
import { DateTime, isDateTime } from "@gravity-ui/date-utils";
import { SubjectStatus } from "@prisma/client";
import { strongPasswordRegex } from "./validations";

const dateTime = z.custom<DateTime | null>(
  (val) => val === null || isDateTime(val),
);

export const signInFormSchema = z.object({
  email: z.string().trim().email("auth.incorrectEmail"),
  password: z.string().min(1, "auth.passwordRequired"),
});
export type SignInFormData = z.infer<typeof signInFormSchema>;

export const createSubjectSchema = z.object({
  name: z.string().min(1),
  date: dateTime,
});
export type CreateSubjectData = z.infer<typeof createSubjectSchema>;

export const editSubjectSchema = z.object({
  id: z.cuid(),
  name: z.string().min(1),
  status: z.enum(SubjectStatus),
  date: dateTime,
});
export type EditSubjectData = z.infer<typeof editSubjectSchema>;

export const createQuestionSchema = z.object({
  questions: z.array(
    z.object({
      name: z.string().min(1),
      answer: z.string(),
    }),
  ),
});
export type CreateQuestionData = z.infer<typeof createQuestionSchema>;

export const editQuestionSchema = z.object({
  name: z.string().min(1),
  answer: z.string(),
});
export type EditQuestionData = z.infer<typeof editQuestionSchema>;

export const recoveryFormSchema = z
  .object({
    email: z.string().trim().email("auth.incorrectEmail"),
    code: z.array(z.string()).length(6).or(z.array(z.string()).length(0)),
    password: z
      .string()
      .regex(strongPasswordRegex, { message: "auth.notStrongPassword" })
      .or(z.literal("")),
    passwordConfirm: z.string(),
  })
  .refine(
    (data) => {
      if (data.password && data.passwordConfirm) {
        return data.password === data.passwordConfirm;
      }
      return true;
    },
    {
      message: "auth.passwordsDontMatch",
      path: ["passwordConfirm"],
    },
  );
export type RecoveryFormData = z.infer<typeof recoveryFormSchema>;

export const signUpFormSchema = z
  .object({
    name: z.string().min(1, "auth.nameRequired"),
    email: z.string().trim().email("auth.incorrectEmail"),
    password: z
      .string()
      .regex(strongPasswordRegex, { message: "auth.notStrongPassword" }),
    passwordConfirm: z.string(),
    code: z.array(z.string()).length(6).or(z.array(z.string()).length(0)),
  })
  .refine(
    (data) => {
      if (data.password && data.passwordConfirm) {
        return data.password === data.passwordConfirm;
      }
      return true;
    },
    {
      message: "auth.passwordsDontMatch",
      path: ["passwordConfirm"],
    },
  );
export type SignUpFormData = z.infer<typeof signUpFormSchema>;
