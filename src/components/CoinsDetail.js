import React from "react";
import { TrendingDown, TrendingUp } from "../icons/icons";
import { ModeState } from "../hooks/Context";

//this component contains details of coins such as coinName, marketCap,
//24h priceChange and images of coins
function CoinsDetail({ coin }) {
  const { symbol } = ModeState();

  function currencyFormat(num) {
    return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }

  return (
    <div data-testid={"container-of-details"}>
      <div className="flex">
        <span className="pr-3 ">
          <img className="w-6" src={coin.image} alt={coin.name} />
        </span>
        <div className="grid grid-col grow">
          <h3>{coin.name}</h3>
          <p className="font-light mb-2 text-xs">
            {symbol} {currencyFormat(coin.market_cap)}
          </p>
        </div>
        <div className="pl-24 ">
          <span
            className={`flex gap-1 text-xs ${
              coin.price_change_percentage_24h < 0
                ? "text-red-600"
                : "text-green-600"
            }`}
          >
            {parseFloat(coin.price_change_percentage_24h).toFixed(2) < 0 ? (
              <TrendingDown />
            ) : (
              <TrendingUp />
            )}

            {parseFloat(coin.price_change_percentage_24h).toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default CoinsDetail;
