import { Flex, Group, Radio } from "@mantine/core";
import { json, LoaderFunction } from "@remix-run/node";
import {
  Outlet,
  useLoaderData,
  useNavigate,
  useSearchParams,
} from "@remix-run/react";
import * as echarts from "echarts";
import ReactECharts from "echarts-for-react";
import { useState } from "react";

import data from "./data.json";
import {
  filterData,
  getBarChartOptions,
  getInitialAge,
  getInitialGender,
} from "../shared/chart/chartUtils";
import { ChartArraySchema, TChartData } from "../shared/chart/types/chart";

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
  const date = "4/10/2022";
  const [chartInstance, setChartInstance] = useState<echarts.ECharts | null>(
    null
  );
  const [genderRadio, setGenderRadio] = useState<TChartData["Gender"]>(
    getInitialGender(searchParams.get("gender"))
  );
  const [ageRange, setAgeRange] = useState<TChartData["Age"]>(
    getInitialAge(searchParams.get("age"))
  );
  const dataToDisplay = filterData(data, date, genderRadio, ageRange);

  const updateChart = (
    date: string,
    gender: TChartData["Gender"],
    age: TChartData["Age"]
  ) => {
    const newData = filterData(data, date, gender, age);
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
      setGenderRadio(value);
      updateChart(date, value, ageRange);
      setSearchParams((prevParams) => {
        prevParams.set("gender", value);
        return prevParams;
      });
    }
  };

  const handleAgeChange = (value: string) => {
    if (value === ">25" || value === "15-25") {
      setAgeRange(value);
      updateChart(date, genderRadio, value);
      setSearchParams((prevParam) => {
        prevParam.set("age", value);
        return prevParam;
      });
    }
  };

  const setChart = (e: ReactECharts | null) => {
    if (!e) return;
    const instance = e.getEchartsInstance();
    setChartInstance(instance);
    instance.on("click", "series", function (params) {
      console.log(params);
      navigate(params.name);
    });
  };

  return (
    <>
      <Flex>
        <ReactECharts
          style={{ width: "100%" }}
          option={getBarChartOptions(dataToDisplay)}
          ref={setChart}
        />
        <Radio.Group
          name="Select Gender"
          value={genderRadio}
          onChange={handleGenderChange}
        >
          <Group>
            <Radio value="Male" label="Male" />
            <Radio value="Female" label="Female" />
          </Group>
        </Radio.Group>
        <Radio.Group
          name="Select Age range"
          value={ageRange}
          onChange={handleAgeChange}
        >
          <Group>
            <Radio value=">25" label=">25" />
            <Radio value="15-25" label="15-25" />
          </Group>
        </Radio.Group>
      </Flex>
      <Outlet />
    </>
  );
}
