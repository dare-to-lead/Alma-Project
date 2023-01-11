import { render, screen } from "@testing-library/react";
import UsdDrop from "../components/UsdDrop";
import ModeContext from "../hooks/Context";

const MockUsdDrop = () => {
  return (
    <ModeContext>
      <UsdDrop />
    </ModeContext>
  );
};

//selection works
describe("UsdDrop", () => {
  it("should render one of option", () => {
    render(<MockUsdDrop />);

    expect(screen.getByText(/USD/i)).toBeInTheDocument();
  });

  //default selection
  it("should correctly set default option", () => {
    render(<MockUsdDrop />);

    expect(screen.getByText(/INR/i).selected).toBe(true);
  });
});
