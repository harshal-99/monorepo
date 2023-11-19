import { useMatches, useParams, useSearchParams } from "@remix-run/react";
import ReactECharts from "echarts-for-react";

import {
  filterLineChartData,
  getLineChartOptions,
  parseAge,
  parseGender,
} from "../shared/chart/chartUtils";
import { ChartArraySchema, DataKeys } from "../shared/chart/types/chart";

// eslint-disable-next-line import/no-default-export
export default function ChartDetailedView() {
  const { id } = useParams();
  const chartId = DataKeys.find((key) => key === id);
  const [searchParams] = useSearchParams();
  const gender = parseGender(searchParams.get("gender"));
  const age = parseAge(searchParams.get("age"));
  const matches = useMatches();
  const data = ChartArraySchema.parse(
    matches.find((match) => match.id.endsWith("/chart"))?.data
  );
  const dataToDisplay = filterLineChartData(id, data, gender, age);
  if (!chartId) return null;
  return <ReactECharts option={getLineChartOptions(dataToDisplay, chartId)} />;
}
