import React from "react";
import { ModeState } from "../hooks/Context";

function UsdDrop() {
  const { currency, setCurrency } = ModeState();

  //console.log('cur',currency)
  return (
    <div data-testid={"options"} className="flex justify-center grow">
      <div className=" xl:w-full">
        <select
          className="form-select block w-full px-3 py-1.5 bg-transparent
      text-base font-normal m-0
     focus:outline-none"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
        >
          <option value={"INR"}>INR</option>
          <option value={"USD"}>USD</option>
        </select>
      </div>
    </div>
  );
}

export default UsdDrop;
