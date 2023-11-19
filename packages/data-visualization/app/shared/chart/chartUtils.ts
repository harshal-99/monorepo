import dayjs, { Dayjs } from "dayjs";
import * as echarts from "echarts";

import { DataKey, DataKeys, TChartData } from "./types/chart";
import { DateRange } from "./types/DateRange";

export const parseGender = (gender: string | null): TChartData["Gender"] => {
  if (gender === "Male" || gender === "Female") return gender;
  return "Male";
};

export const parseAge = (age: string | null): TChartData["Age"] => {
  if (age === ">25" || age === "15-25") return age;
  return "15-25";
};

const toDayJs = (date: string): Dayjs => {
  const [day, month, year] = date.split("/");
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  return dayjs(`${year}-${month}-${day}`) as Dayjs;
};

const filterDate = (date: string, range: DateRange): boolean => {
  const day: Dayjs = toDayJs(date);
  const [min, max] = range;
  if (!min || !max) return true;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const minDay: Dayjs = dayjs(min) as Dayjs;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const maxDay: Dayjs = dayjs(max) as Dayjs;
  return minDay.isBefore(day) && maxDay.isAfter(day);
};

export const filterBarChartData = (
  data: TChartData[],
  date: DateRange,
  gender: TChartData["Gender"],
  age: TChartData["Age"]
) => {
  return data
    .filter((d) => d.Age === age)
    .filter((d) => d.Gender === gender)
    .filter((d) => filterDate(d.Day, date))
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

export const getLineChartOptions = (
  data: TChartData[],
  id: DataKey
): echarts.EChartsOption => {
  return {
    title: {
      text: `Feature ${id}`,
    },
    xAxis: {
      type: "category",
      nameLocation: "middle",
      nameGap: 25,
      name: "Dates",
      data: data.map((d) => d.Day),
      axisLabel: {
        formatter: (value: string) => {
          return toDayJs(value).format("DD-MMM");
        },
      },
    },
    yAxis: {
      type: "value",
      name: "Time spend",
      nameLocation: "middle",
      nameGap: 40,
    },
    dataZoom: [
      {
        type: "inside",
        throttle: 50,
      },
    ],
    series: [
      {
        type: "line",
        data: data.map((d) => d[id]),
      },
    ],
    toolbox: {
      feature: {
        dataZoom: {
          yAxisIndex: "none",
        },
        restore: {},
      },
    },
  };
};

export const getMinAndMaxDates = (
  data: TChartData[]
): {
  min: Dayjs;
  max: Dayjs;
} => {
  const dates: dayjs.Dayjs[] = data.map((d) => toDayJs(d.Day));

  dates.sort((a: dayjs.Dayjs, b: dayjs.Dayjs) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-call
    if (a.isBefore(b)) return -1;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-call
    if (a.isAfter(b)) return 1;
    return 0;
  });

  return {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    min: dates[0],
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-assignment
    max: dates.at(-1) ?? (dayjs() as Dayjs),
  };
};

export const parseDate = (date: string | null): Date | null => {
  if (date === null) return null;
  const parsedDate = parseInt(date, 10);
  if (isNaN(parsedDate)) return null;
  return new Date(parsedDate);
};

export const filterLineChartData = (
  id: string | undefined,
  data: TChartData[],
  gender: TChartData["Gender"],
  age: TChartData["Age"]
) => {
  if (!id || !data) return [];
  return data.filter((d) => d.Age === age).filter((d) => d.Gender === gender);
};
