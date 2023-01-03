import React, { useState, useEffect } from "react";
import CoinsDetail from "./CoinsDetail";
import { ModeState } from "../hooks/Context";
import axios from "axios";
// const axios = require("axios");

function MarketCap({ search }) {
  const [response, setResponse] = useState();
  // console.log(response)

  const { currency } = ModeState();

  useEffect(() => {
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&page=1&per_page=15`
      )
      .then((result) => {
        setResponse(result.data);
      })
      .catch((err) => {
        return err;
      });
  }, [currency]);

  return (
    <div>
      <section className="mt-4">
        <h1 className="tex-2xl font-bold pl-12 pb-6">
          Cryptocurrency By MarketCap
        </h1>
        {response &&
          response
            .filter((coin) => {
              if (search == "") {
                return coin;
              } else if (
                coin.name.toLowerCase().includes(search.toLowerCase())
              ) {
                return coin;
              }
            })
            .map((coin) => {
              return <CoinsDetail key={coin.id} coin={coin} />;
            })}
      </section>
    </div>
  );
}

export default MarketCap;
