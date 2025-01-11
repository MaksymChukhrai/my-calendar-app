import { render, fireEvent, waitFor } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import Filters from "./Filters";

describe("Filters Component", () => {
  const mockProps = {
    currentMonth: new Date(2024, 0, 1), // January 1, 2024
    onPreviousMonth: vi.fn(),
    onNextMonth: vi.fn(),
    onSearch: vi.fn(),
  };

  test("renders month and year", () => {
    const { getByText } = render(<Filters {...mockProps} />);
    expect(getByText("January 2024")).toBeInTheDocument();
  });

  test("handles previous month navigation", () => {
    const { getByLabelText } = render(<Filters {...mockProps} />);
    const prevButton = getByLabelText("Previous Month");
    fireEvent.click(prevButton);
    expect(mockProps.onPreviousMonth).toHaveBeenCalled();
  });

  test("handles next month navigation", () => {
    const { getByLabelText } = render(<Filters {...mockProps} />);
    const nextButton = getByLabelText("Next Month");
    fireEvent.click(nextButton);
    expect(mockProps.onNextMonth).toHaveBeenCalled();
  });

  test("handles search input", async () => {
    const { getByPlaceholderText } = render(<Filters {...mockProps} />);
    const searchInput = getByPlaceholderText("...search task");

    fireEvent.change(searchInput, { target: { value: "test task" } });

    await waitFor(
      () => {
        expect(mockProps.onSearch).toHaveBeenCalledWith("test task");
      },
      { timeout: 400 }
    );
  });
});
