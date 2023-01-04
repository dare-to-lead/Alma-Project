import { render, screen, waitFor } from "@testing-library/react";
import ModeContext from "../hooks/Context";
import MarketCap from "./MarketCap";

const MockMarketCap = () => {
  return (
    <ModeContext>
      <MarketCap search={""} />
    </ModeContext>
  );
};

describe("MarketCap", () => {
  it("should render information of coins", async () => {
    render(<MockMarketCap />);
    const divElements = await waitFor(
      () => screen.findAllByTestId(/container-of-details/i),
      { timeout: 3000 }
    );

    expect(divElements.length).toBe(15);
  });
});
screen.debug();
