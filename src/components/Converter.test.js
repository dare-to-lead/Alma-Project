import { render, screen } from "@testing-library/react";

import Converter from "./Converter";

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
