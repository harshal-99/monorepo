import { z } from "zod";

export const emailSchema = z.object({
  id: z.string(),
  from: z.object({
    email: z.string(),
    name: z.string(),
  }),
  date: z.number(),
  subject: z.string(),
  short_description: z.string(),
  favorite: z.boolean().optional(),
});

export type TEmail = z.infer<typeof emailSchema>;
