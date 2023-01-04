import { render, screen, waitFor } from "@testing-library/react";
import ModeContext from "../hooks/Context";
import CoinsDetail from "./CoinsDetail";

const MockCoinDetail = () => {
  return (
    <ModeContext>
      <CoinsDetail name="Bitcoin" />
    </ModeContext>
  );
};

it("renders the details of the coins", async () => {
  render(<MockCoinDetail />);
  const headingElement = await waitFor(() => screen.findByText("Bitcoin"), {
    timeout: 4000,
  });
  expect(headingElement).toBeInTheDocument();
});
