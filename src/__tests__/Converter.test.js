import { render, screen } from "@testing-library/react";

import Converter from "../components/Converter";

//element present in the DOM
describe("Converter", () => {
  it("renders button element", () => {
    render(<Converter />);
    const buttonElement = screen.getByRole("button", {
      name: "Exchange",
      exact: false,
    });
    expect(buttonElement).toBeInTheDocument();
  });
});
