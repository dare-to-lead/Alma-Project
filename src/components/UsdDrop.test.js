import { render, screen } from "@testing-library/react";
import UsdDrop from "./UsdDrop";
import ModeContext from "../hooks/Context";

const MockUsdDrop = () => {
  return (
    <ModeContext>
      <UsdDrop />
    </ModeContext>
  );
};

//it('should correctly set default option', () => {
//   render(<App />)
// expect(screen.getByRole('option', {name: 'CA'}).selected).toBe(true)
//})

describe("UsdDrop", () => {
  it("should render one of option", () => {
    render(<MockUsdDrop />);

    expect(screen.getByText(/USD/i)).toBeInTheDocument();
  });

  it("should correctly set default option", () => {
    render(<MockUsdDrop />);

    expect(screen.getByText(/INR/i).selected).toBe(true);
  });
});
