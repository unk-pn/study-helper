import { SubjectStatus } from "@prisma/client";
import { z } from "zod";

export const subjectSchema = z.object({
  id: z.cuid(),
  name: z.string().min(1),
  userId: z.cuid(),
  status: z.enum(SubjectStatus),
  examDate: z.coerce.date().nullable(),
  _count: z.object({
    questions: z.number().int().min(0),
  }),
});

export const questionSchema = z.object({
  id: z.cuid(),
  name: z.string().min(1),
  subjectId: z.cuid(),
  answer: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const cardSchema = z.object({
  id: z.cuid(),
  name: z.string().min(1),
  answer: z.string().nullable(),
  subjectId: z.cuid(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const subjectArraySchema = z.array(subjectSchema);
export const questionArraySchema = z.array(questionSchema);
export const cardArraySchema = z.array(cardSchema)

export type Subject = z.infer<typeof subjectSchema>;
export type Question = z.infer<typeof questionSchema>;
export type Card = z.infer<typeof cardSchema>;


