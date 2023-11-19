import { Flex, Group, Radio, em, rem } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useMediaQuery } from "@mantine/hooks";
import { json, LoaderFunction } from "@remix-run/node";
import {
  Link,
  Outlet,
  useLoaderData,
  useNavigate,
  useSearchParams,
} from "@remix-run/react";
import * as echarts from "echarts";
import ReactECharts from "echarts-for-react";
import { useMemo, useState } from "react";

import data from "./data.json";
import {
  filterBarChartData,
  getBarChartOptions,
  parseAge,
  parseDate,
  parseGender,
  getMinAndMaxDates,
} from "../shared/chart/chartUtils";
import { ChartArraySchema, TChartData } from "../shared/chart/types/chart";
import { DateRange } from "../shared/chart/types/DateRange";

export const loader: LoaderFunction = () => {
  const headers = new Headers();
  // Cache for 10 minutes (600 seconds) since data will not change
  headers.set("Cache-Control", "private, max-age=600");
  return json(ChartArraySchema.parse(data), { headers });
};

// eslint-disable-next-line import/no-default-export
export default function Chart() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const data = useLoaderData() as TChartData[];
  const gender = parseGender(searchParams.get("gender"));
  const age = parseAge(searchParams.get("age"));
  const [dateRange, setDateRange] = useState<DateRange>([
    parseDate(searchParams.get("startDate")),
    parseDate(searchParams.get("endDate")),
  ]);
  const [chartInstance, setChartInstance] = useState<echarts.ECharts | null>(
    null
  );
  const dataToDisplay = filterBarChartData(data, dateRange, gender, age);
  const { min, max } = useMemo(() => getMinAndMaxDates(data), [data]);
  const isMobile = useMediaQuery(`(max-width: ${em(1080)})`);
  const updateChart = (
    date: DateRange,
    gender: TChartData["Gender"],
    age: TChartData["Age"]
  ) => {
    const newData = filterBarChartData(data, date, gender, age);
    if (!newData || !chartInstance) return;
    chartInstance.setOption({
      series: [
        {
          data: [
            newData.A,
            newData.B,
            newData.C,
            newData.D,
            newData.E,
            newData.F,
          ],
          type: "bar",
        },
      ],
    });
  };
  const handleGenderChange = (value: string) => {
    if (value === "Male" || value === "Female") {
      updateChart(dateRange, value, age);
      setSearchParams((prevParams) => {
        prevParams.set("gender", value);
        return prevParams;
      });
    }
  };

  const handleAgeChange = (value: string) => {
    if (value === ">25" || value === "15-25") {
      updateChart(dateRange, gender, value);
      setSearchParams((prevParam) => {
        prevParam.set("age", value);
        return prevParam;
      });
    }
  };

  const handleDateChange = (value: [Date | null, Date | null]) => {
    setDateRange(value);
    updateChart(value, gender, age);
    setSearchParams((prevParam) => {
      prevParam.set("startDate", value[0]?.getTime()?.toString() ?? "");
      prevParam.set("endDate", value[1]?.getTime()?.toString() ?? "");
      return prevParam;
    });
  };

  const setChart = (e: ReactECharts | null) => {
    if (!e) return;
    const instance = e.getEchartsInstance();
    setChartInstance(instance);
    instance.on("click", "series", function (params) {
      navigate(params.name + "?" + searchParams.toString());
    });
  };

  return (
    <>
      <Link to="/chart">Reset chart</Link>
      <Flex p={8} direction={isMobile ? "column" : "row"}>
        <ReactECharts
          style={{ width: "100%" }}
          option={getBarChartOptions(dataToDisplay)}
          ref={setChart}
        />
        <Flex direction="column">
          <Flex gap={rem(8)}>
            <Radio.Group
              name="Select Gender"
              value={gender}
              onChange={handleGenderChange}
            >
              <Group>
                <Radio value="Male" label="Male" />
                <Radio value="Female" label="Female" />
              </Group>
            </Radio.Group>
            <Radio.Group
              name="Select Age range"
              value={age}
              onChange={handleAgeChange}
            >
              <Group>
                <Radio value=">25" label=">25" />
                <Radio value="15-25" label="15-25" />
              </Group>
            </Radio.Group>
          </Flex>
          <DatePickerInput
            type="range"
            label="Pick date range"
            value={dateRange}
            onChange={handleDateChange}
            minDate={min.toDate()}
            maxDate={max.toDate()}
          />
        </Flex>
      </Flex>
      <Outlet />
    </>
  );
}
