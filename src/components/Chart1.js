import React, { useState, useEffect } from "react";
import { ModeState } from "../hooks/Context";
import BarChart from "./BarChart";
import HorizontalBar from "./HorizontalBar";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler
);

const colorofgraph = [
  {
    borderColor: "#d591ee",
    backgroundColor: "#8E44AD",
  },
  {
    borderColor: "#F9E79F",
    backgroundColor: " #F7DC6F",
  },
  {
    borderColor: "#B5FCF9  ",
    backgroundColor: "#3AF5EC ",
  },
];

//this component cotains components of different chart types
function Chart1({ multiselect }) {
  const [range, setRange] = useState(1);
  const [chartType, setChartType] = useState("Line");
  const [result2, setResult2] = useState([]);
  // const [interval, setInterval] = useState([]);
  const { currency } = ModeState();

  useEffect(() => {
    async function loadData() {
      const responseArray = [];
      for (var i = 0; i < multiselect.length; i++) {
        const value = multiselect[i];

        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${value}/market_chart?vs_currency=${currency}&days=${range}&interval=daily`
        );
        responseArray.push(response.data.prices);
        console.log("response", response.data.prices, value);
      }
      setResult2(responseArray);
    }
    loadData();
  }, [range, chartType, currency, multiselect]);

  useEffect(() => {
    console.log("result2", result2);
  }, [result2]);

  const options = {
    responsive: true,
    indexAxis: "x",
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
      },
    },
    maintainAspectRatio: false,
  };
  const data = {
    labels: result2[0]?.map((value) => {
      let date = new Date(value[0]);
      let time =
        date.getHours() > 12
          ? `${date.getHours() - 12}:${date.getMinutes()}PM`
          : `${date.getHours()} : ${date.getMinutes()}AM`;
      return range === 1
        ? time
        : date.toLocaleDateString("default", {
            month: "short",
            day: "numeric",
          });
    }),
    datasets: result2?.map((dataset, i) => {
      return {
        data: dataset.map((val) => val[1]),
        borderColor: colorofgraph[i].borderColor,
        backgroundColor: colorofgraph[i].backgroundColor,
      };
    }),
  };

  return (
    <>
      <div className="mt-4">
        <div className="flex row  lg:ml-[16rem] md:ml-[10rem]">
          <div
            className="lg:flex lg:space-x-10 md:space-x-3 sm:space-x-3 xs:space-x-3"
            onClick={(e) => {
              setRange(e.target.value);
            }}
          >
            {/* user can see charts of different time range */}
            <button className="bg-purple-100 rounded p-1" value={1}>
              1D
            </button>
            <button className="bg-purple-100 rounded p-1" value={7}>
              7D
            </button>
            <button className="bg-purple-100 rounded p-1" value={30}>
              1M
            </button>
            <button className="bg-purple-100 rounded p-1" value={365}>
              1Y
            </button>
          </div>

          <div className="ml-16">
            {/* user can see different chart types such as bar chart and line chart  */}
            <select
              className="bg-purple-100 w-16 p-1 "
              onChange={(e) => setChartType(e.target.value)}
            >
              <option value={"Line"}>Line</option>
              <option value={"HorizontalBar"}>Horizontal Bar</option>
              <option value={"BarChart"}>Vertical Bar</option>
            </select>
          </div>
        </div>
        <div className="h-72">
          {chartType === "Line" ? (
            <Line
              options={options}
              data={data}
              colorofgraph={colorofgraph}
              range={range}
            />
          ) : chartType === "HorizontalBar" ? (
            <HorizontalBar
              colorofgraph={colorofgraph}
              result2={result2}
              range={range}
            />
          ) : (
            <BarChart
              colorofgraph={colorofgraph}
              result2={result2}
              range={range}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default Chart1;
