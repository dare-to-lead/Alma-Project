import "./App.css";
import React, { useState } from "react";
import Converter from "./components/Converter";
import MarketCap from "./components/MarketCap";
import Portfolio from "./components/Portfolio";
import SearchBar from "./components/SearchBar";
import UsdDrop from "./components/UsdDrop";
import Chartdropdown from "./components/Chartdrpdown";
import ModeContext from "./hooks/Context";

function App() {
  const [search, setSearch] = useState([]);

  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  };

  const handleChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  return (
    <ModeContext value={{ theme, toggleTheme }}>
      <div className="App" id={theme}>
        <button
          className="btn"
          onClick={toggleTheme}
          checked={theme === "dark"}
        >
          {theme === "light" ? "Light Mode" : "Dark Mode"}
        </button>
        <div className="container-fluid mx-auto">
          <div className="p-4 max-w-48 grid gap-6 md:grid-cols-1 lg:grid-cols-6 sm:1 h-screen">
            <div
              id="usddrop"
              className="flex justify-center lg:col-span-1 h-10 shadow-lg"
            >
              <UsdDrop />
            </div>
            <div id="searchbar" className="flex lg:col-span-3 h-10 shadow-lg">
              <SearchBar handleChange={handleChange} search={search} />
            </div>
            <div
              id="marketcap"
              className="flex justify-center  items-center lg:col-span-2 lg:row-span-3 shadow-lg"
            >
              <MarketCap search={search} />
            </div>
            <div
              id="chart"
              className="flex justify-center  items-center lg:col-span-4 shadow-lg mt-0 w-full lg:h-96"
            >
              <Chartdropdown />
            </div>
            <div
              id="portfolio"
              className="flex justify-center  items-center gap-6 lg:col-span-2 shadow-lg h-60"
            >
              <Portfolio />
            </div>
            <div
              id="converter"
              className="flex justify-center items-center lg:col-span-2 shadow-lg"
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
