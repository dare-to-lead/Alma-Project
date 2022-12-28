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

const colorOfGraph = [
  {
    borderColor: "rgb(70,70 , 255)",
    backgroundColor: "rgba(20, 20, 255, 0.5)",
  },
  {
    borderColor: "rgb(255, 70, 70)",
    backgroundColor: "rgba(255, 20,20, 0.5)",
  },
  {
    borderColor: "rgb(70, 255, 70)",
    backgroundColor: "rgba(20, 255, 20, 0.5)",
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

  // function forHoursRange() {
  //   if (range === 1) {
  //     setInterval("hourly");
  //   } else if (range === 7) {
  //     setInterval("daily");
  //   } else if (range === 30) {
  //     setInterval("daily");
  //   } else {
  //     setInterval("monthly");
  //   }
  // }

  // const coinChartData = result2?.map((value) => ({
  //   x: value[0],
  //   y: value[1],
  // }));
  //console.log(coinChartData)//
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
            year: "numeric",
          });
    }),
    datasets: result2?.map((dataset, i) => {
      return {
        data: dataset.map((val) => val[1]),
        borderColor: colorOfGraph[i].borderColor,
        backgroundColor: colorOfGraph[i].backgroundColor,
      };
    }),
  };

  return (
    <>
      <div>
        <div className="flex grow">
          <div
            className="ml-36 mt-0 flex "
            // onChange={() => forHoursRange()}
            onClick={(e) => {
              setRange(e.target.value);
              // forHoursRange();
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
              colorOfGraph={colorOfGraph}
              range={range}
            />
          ) : chartType === "HorizontalBar" ? (
            <HorizontalBar
              colorOfGraph={colorOfGraph}
              result2={result2}
              range={range}
            />
          ) : (
            <BarChart
              colorOfGraph={colorOfGraph}
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
