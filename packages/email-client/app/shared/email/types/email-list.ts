import { z } from "zod";
import { emailSchema } from "./email";

export const emailListSchema = z.object({
  total: z.number(),
  list: z.array(emailSchema),
});

export type TEmailList = z.infer<typeof emailListSchema>;
