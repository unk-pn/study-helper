import { z } from "zod";
import { DateTime, isDateTime } from "@gravity-ui/date-utils";
import { SubjectStatus } from "@prisma/client";

const dateTime = z.custom<DateTime | null>(
  (val) => val === null || isDateTime(val),
);

export const signInFormSchema = z.object({
  email: z.email("auth.incorrectEmail"),
  password: z.string().min(1, "auth.passwordRequired"),
});
export type SignInFormData = z.infer<typeof signInFormSchema>;

export const createSubjectSchema = z.object({
  name: z.string().min(1),
  // date: z.custom<DateTime | null>((val) => val === null || isDateTime(val)),
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
