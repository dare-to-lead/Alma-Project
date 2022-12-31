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
      <div>
        <div className="flex grow">
          <div
            className="ml-36 mt-0 flex "
            onClick={(e) => {
              setRange(e.target.value);
            }}
          >
            <button className="bg-purple-100 rounded" value={1}>
              1 day
            </button>
            <button className="bg-purple-100 rounded ml-2" value={7}>
              7 days
            </button>
            <button className="bg-purple-100 rounded ml-2" value={30}>
              1 Month
            </button>
            <button className="bg-purple-100 rounded ml-2" value={365}>
              1 Year
            </button>
          </div>
          <div className="ml-6">
            <select
              className="bg-purple-100"
              onChange={(e) => setChartType(e.target.value)}
            >
              <option value={"Line"}>Line</option>
              <option value={"HorizontalBar"}>Horizontal Bar</option>
              <option value={"BarChart"}>Vertical Bar</option>
            </select>
          </div>
        </div>
        <div className="col-md-5 mb-3 mt-3 h-64">
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
