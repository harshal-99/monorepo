import { z } from "zod";

export const emailDetailSchema = z.object({
  id: z.string(),
  body: z.string(),
});

export type TEmailDetail = z.infer<typeof emailDetailSchema>;
