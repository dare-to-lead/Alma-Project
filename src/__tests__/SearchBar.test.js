import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "../components/SearchBar";

describe("SearchBar", () => {
  it("should be able to type in the input element", async () => {
    render(<SearchBar />);
    const inputElement = screen.getByPlaceholderText(/Search/i);
    fireEvent.change(inputElement, { target: { value: "bitcoin" } });
    expect(inputElement.value).toBe("bitcoin");
  });
});
