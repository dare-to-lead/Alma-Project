import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import axios from "axios";
import { ModeState } from "../hooks/Context";

ChartJS.register(ArcElement, Tooltip, Legend);

//this folder represents the portfolio of 3 coins in pie chart and shows total value for the same
function Portfolio() {
  const [portCoins, setPortCoins] = useState();
  const { currency, symbol } = ModeState();

  // console.log('pot',portCoins)

  useEffect(() => {
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=bitcoin%2Cethereum%2Cbinancecoin&order=market_cap_desc`
      )
      .then((rspns) => {
        //console.log('rspns',rspns.data)
        setPortCoins(rspns.data);
      })
      .catch((err) => {
        return err;
      });
  }, [currency]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "right",
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
          padding: 20,
        },
      },
    },
  };

  const data = {
    labels:
      portCoins &&
      Object.values(portCoins).map((value) => {
        return value.name;
      }),
    datasets: [
      {
        data:
          portCoins &&
          Object.values(portCoins).map((value) => {
            return value.current_price;
          }),
        backgroundColor: ["#d591ee", "#F9E79F", "#B5FCF9"],
        borderColor: ["#8E44AD", "#F7DC6F", "#3AF5EC"],
        borderWidth: 1,
        hoverOffset: 20,
        offset: [0, 10, 30],
      },
    ],
  };

  return (
    <>
      <div className="justify-center">
        <h1 className="lg:ml-24 md:ml-10 font-bold pt-20">
          Portfolio
          <span className="color-black ml-20 font-normal">
            Total Value{symbol}{" "}
            {portCoins
              ?.map((val) => {
                return val.current_price;
              })
              .reduce((cur, acc) => {
                return cur + acc;
              })
              .toFixed(2)}
          </span>
        </h1>
        <div className="  h-[250px] w-[250px] lg:ml-24">
          <Pie data={data} options={options} />
        </div>
      </div>
    </>
  );
}

export default Portfolio;
