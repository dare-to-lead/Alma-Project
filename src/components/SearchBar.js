import React from "react";

//user can search their favourite coins which will result in sidebar
function SearchBar({ search, handleChange }) {
  return (
    <>
      <div className="flex justify-center grow">
        <div className=" xl:w-full">
          <div className="input-group relative flex flex-wrap items-stretch w-full mb-4">
            <input
              type="search"
              onChange={handleChange}
              value={search}
              className="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5  font-normal  bg-transparent  m-0  focus:outline-none"
              placeholder="Search"
              aria-label="Search"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default SearchBar;
