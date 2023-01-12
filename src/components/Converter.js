import React, { useEffect, useState } from "react";
import axios from "axios";

//user can convert rates of different coins
function Converter() {
  const [inputValue, setinputValue] = useState("");
  const [inputValueTwo, setinputValueTwo] = useState(1);
  const [value1, setvalue1] = useState(1);
  const [value2, setvalue2] = useState(1);
  const [coin, setCoin] = useState();

  // console.log("coin", coin)
  // fetching from currency converter api
  useEffect(() => {
    axios
      .get("https://api.coingecko.com/api/v3/exchange_rates")
      .then((resp) => {
        setCoin(resp.data.rates);
      })
      .catch((err) => {
        return err;
      });
  }, []);

  const convert = () => {
    let result = ((value2 / value1) * inputValue).toFixed(2);
    setinputValueTwo(result);
  };

  return (
    <div className="pl-4 ">
      <div className="font-bold pl-16 mb-4">
        <h1>Exchange Coins</h1>
      </div>
      <div>
        <table>
          <tbody>
            <tr>
              <td className="text-green-600 lg:pr-4">From</td>
              <td>
                <input
                  className="h-8 lg:w-40 md:w-20 sm:w-40 rounded mb-2 bg-purple-100 text-center"
                  value={inputValue}
                  type="number"
                  name="currency-amount-1"
                  onChange={(e) => setinputValue(e.target.value)}
                />
              </td>
              <td>
                <select
                  className="lg:w-20 md:w-12 sm:w-20 xs:w-20 lg:ml-4  sm:ml-6 p-1 mb-2 rounded bg-purple-100"
                  onChange={(e) => setvalue1(e.target.value)}
                >
                  {coin &&
                    Object.values(coin).map((d, k) => (
                      <option key={k} value={d.value}>
                        {d.name}
                      </option>
                    ))}
                </select>
              </td>
            </tr>

            <tr>
              <td className="text-red-600">To</td>
              <td>
                <p className=" bg-purple-100 text-center">{inputValueTwo}</p>
              </td>
              <td>
                <select
                  className="lg:w-20 md:w-12 sm:w-20 xs:w-20 lg:ml-4 sm:ml-6 p-1 rounded  bg-purple-100"
                  onChange={(e) => setvalue2(e.target.value)}
                >
                  {coin &&
                    Object.values(coin).map((d, k) => (
                      <option key={k} value={d.value}>
                        {d.name}
                      </option>
                    ))}
                </select>
              </td>
            </tr>
          </tbody>
        </table>
        <button
          className="bg-[#cc98dc] w-36 h-10 rounded text-white ml-20  bg-purple-100 mt-2"
          onClick={convert}
          id="convert-btn"
        >
          Exchange
        </button>
      </div>
    </div>
  );
}

export default Converter;
