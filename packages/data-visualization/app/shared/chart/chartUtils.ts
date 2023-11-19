import * as echarts from "echarts";

import { DataKeys, TChartData } from "./types/chart";

export const getInitialGender = (
  gender: string | null
): TChartData["Gender"] => {
  if (gender === "Male" || gender === "Female") return gender;
  return "Male";
};

export const getInitialAge = (age: string | null): TChartData["Age"] => {
  if (age === ">25" || age === "15-25") return age;
  return "15-25";
};

export const filterData = (
  data: TChartData[],
  date: string,
  gender: TChartData["Gender"],
  age: TChartData["Age"]
) => {
  return data
    .filter((d) => d.Age === age)
    .filter((d) => d.Gender === gender)
    .filter((d) => d.Day === date)
    .reduce(
      (acc, value) => {
        DataKeys.forEach((key) => {
          acc[key] += value[key];
        });

        return acc;
      },
      { A: 0, B: 0, C: 0, D: 0, E: 0, F: 0 }
    );
};

export const getBarChartOptions = (
  data: Omit<TChartData, "Gender" | "Age" | "Day">
): echarts.EChartsOption => {
  return {
    xAxis: {
      type: "value",
      nameLocation: "middle",
      nameGap: 20,
      name: "Time spend",
    },
    yAxis: {
      type: "category",
      name: "Feature",
      nameLocation: "middle",
      nameGap: 20,
      data: [...DataKeys],
    },
    series: [
      {
        data: [data.A, data.B, data.C, data.D, data.E, data.F],
        type: "bar",
      },
    ],
  };
};
