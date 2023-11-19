import { z } from "zod";

export const ChartDataSchema = z.object({
  Day: z.string(),
  Age: z.union([z.literal("15-25"), z.literal(">25")]),
  Gender: z.union([z.literal("Male"), z.literal("Female")]),
  A: z.number(),
  B: z.number(),
  C: z.number(),
  D: z.number(),
  E: z.number(),
  F: z.number(),
});

export const ChartArraySchema = z.array(ChartDataSchema);

export type TChartData = z.infer<typeof ChartDataSchema>;

export const DataKeys = ["A", "B", "C", "D", "E", "F"] as const;
export type DataKey = (typeof DataKeys)[number];
