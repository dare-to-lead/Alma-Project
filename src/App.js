import React, { useEffect, useState } from "react";
import Converter from "./components/Converter";
import MarketCap from "./components/MarketCap";
import Portfolio from "./components/Portfolio";
import SearchBar from "./components/SearchBar";
import UsdDrop from "./components/UsdDrop";
import Chartdropdown from "./components/Chartdrpdown";
import ModeContext from "./hooks/Context";
import { changeTheme } from "./redux/action";
import { useDispatch, useSelector } from "react-redux";

//this is the parent component
function App() {
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();
  const theme = useSelector((state) => state.darkMode);
  console.log("theme", theme);

  const handleChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  function toggleMode() {
    if (theme === "light") {
      dispatch(changeTheme("dark"));
    } else {
      dispatch(changeTheme("light"));
    }
  }

  useEffect(() => {
    document.body.id = theme;
  }, [theme]);

  return (
    <ModeContext>
      <div className="App" id={theme}>
        <div className="">
          <div className="p-4 max-w-48 grid grid-cols-1 gap-4 md:grid-cols-6 sm:grid-cols-1 lg:grid-cols-6">
            <div className="flex lg:col-span-4 lg:row-span-1 md:col-span-4 md:row-span-1  gap-4">
              <button
                className="btn font-bold lg:col-span-1 md:col-span-1 h-10"
                onClick={toggleMode}
              >
                {theme === "light" ? "Light" : "Dark"}
              </button>
              <div
                id="usddrop"
                className="flex justify-center lg:col-span-1 md:col-span-1 h-10 shadow-lg"
              >
                <UsdDrop />
              </div>
              <div
                id="searchbar"
                className="flex lg:col-span-2 md:col-span-2 grow h-10 shadow-lg"
              >
                <SearchBar handleChange={handleChange} search={search} />
              </div>
            </div>
            <div
              id="marketcap"
              className="flex justify-center  items-center lg:col-span-2 md:col-span-2 lg:row-span-3 md:row-span-3 shadow-lg"
            >
              <MarketCap search={search} />
            </div>
            <div
              id="chart"
              className=" lg:col-span-4 md:col-span-4 shadow-lg mt-0 w-full"
            >
              <Chartdropdown />
            </div>
            <div
              id="portfolio"
              className="flex justify-center items-center lg:col-span-2 md:col-span-2 shadow-lg "
            >
              <Portfolio />
            </div>
            <div
              id="converter"
              className="flex justify-center items-center lg:col-span-2 md:col-span-2 shadow-lg"
            >
              <Converter />
            </div>
          </div>
        </div>
      </div>
    </ModeContext>
  );
}

export default App;
