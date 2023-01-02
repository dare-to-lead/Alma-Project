import { render, screen } from "@testing-library/react";
import MarketCap from "./MarketCap";

describe("MarketCap", () => {
  it("should render information of coins", async () => {
    render(<MarketCap />);
    const divElement = screen.getByTestId("container-of-details");
    expect(divElement).toBeInTheDocument();
  });
});
