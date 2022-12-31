import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

function HorizontalBar({ colorofgraph, result2, range }) {
  const options = {
    indexAxis: "y",
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
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
        borderColor: colorofgraph[i].borderColor,
        backgroundColor: colorofgraph[i].backgroundColor,
      };
    }),
  };

  return (
    <div className="col-md-5 mb-3 mt-3 h-72 " style={{ height: 290 }}>
      <Bar options={options} data={data} />
    </div>
  );
}

export default HorizontalBar;
