import React, { useState, useEffect } from "react";
import axios from "axios";
import Chart1 from "./Chart1";

import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

//this component contains dropdowns and it is the parent component  of  different charts' components
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Chartdropdown() {
  const [cryptos, setCryptos] = useState();
  const [multiselect, setMultiselect] = useState(["bitcoin"]);
  console.log("xyz", multiselect);

  function currencyItemClicked(id) {
    if (multiselect.includes(id)) {
      const multiSelectCopy = [...multiselect];
      const index = multiselect.indexOf(id);

      multiSelectCopy.splice(index, 1);

      setMultiselect(multiSelectCopy);
    } else {
      setMultiselect([...multiselect, id]);
    }
  }
  //console.log('multi', multiselect)

  useEffect(() => {
    const url =
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&page=1&per_page=9";
    axios
      .get(url)
      .then((res) => {
        setCryptos(res.data);
      })
      .catch((err) => {
        return err;
      });
  }, []);

  //this drop-down contains cryptocurrencies and user can select multiple
  //coins at the same time
  return (
    <div className="pt-4 pl-10 ">
      <div>
        <Menu as="div" className="relative inline-block text-right">
          <div>
            <Menu.Button className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
              {multiselect.join(" , ")}
              <ChevronDownIcon
                className="-mr-1 ml-2 h-5 w-5"
                aria-hidden="true"
              />
            </Menu.Button>
          </div>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            {/* user can select currencies of their choice */}
            <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                {cryptos &&
                  cryptos.map((crypto, k) => {
                    return (
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            key={k}
                            // onClick={()=>setSelected(crypto.id)}
                            onClick={() => currencyItemClicked(crypto.id)}
                            value={crypto.id}
                            className={classNames(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            {crypto.name}
                          </a>
                        )}
                      </Menu.Item>
                    );
                  })}
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
      <div className="">
        <Chart1 multiselect={multiselect} />
      </div>
    </div>
  );
}

export default Chartdropdown;
