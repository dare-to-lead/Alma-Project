import { render, screen } from "@testing-library/react";
import MarketCap from "./MarketCap";
import "@testing-library/jest-dom/extend-expect";

describe("MarketCap", () => {
  it("should render information of coins", async () => {
    render(<MarketCap />);
    const divElement = await screen.getByTestId("container-of-details");
    expect(divElement).toBeInTheDocument();
  });
});
