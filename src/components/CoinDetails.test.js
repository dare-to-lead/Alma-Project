import { render, screen } from "@testing-library/react";
import ModeContext from "../hooks/Context";
import CoinsDetail from "./CoinsDetail";

const MockCoinDetail = () => {
  <ModeContext>
    <CoinsDetail />
  </ModeContext>;
};
it("renders without crashing", () => {
  render(<MockCoinDetail marketcap={123456} priceChange={12.34} />);
});

it("renders the name of the coin", async () => {
  render(<MockCoinDetail />);
  const divElement = await screen.findAllByTestId(/container-of-details/i);
  expect(divElement.length).toBe(15);
});
