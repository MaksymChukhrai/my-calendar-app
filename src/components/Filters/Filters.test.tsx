import { render, screen, fireEvent } from "@testing-library/react";
import Filters from "./Filters";

describe("Filters Component", () => {
  const mockProps = {
    currentMonth: new Date("2025-01-01"), // Пример текущей даты
    onPreviousMonth: jest.fn(),
    onNextMonth: jest.fn(),
    onSearch: jest.fn(),
  };

  it("renders navigation buttons and current month", () => {
    render(<Filters {...mockProps} />);
    expect(screen.getByLabelText("Previous Month")).toBeInTheDocument();
    expect(screen.getByLabelText("Next Month")).toBeInTheDocument();
    expect(screen.getByText(/January 2025/i)).toBeInTheDocument();
  });

  it("handles month navigation correctly", () => {
    render(<Filters {...mockProps} />);
    fireEvent.click(screen.getByLabelText("Previous Month"));
    expect(mockProps.onPreviousMonth).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByLabelText("Next Month"));
    expect(mockProps.onNextMonth).toHaveBeenCalledTimes(1);
  });

  it("filters tasks using the search input", () => {
    render(<Filters {...mockProps} />);
    const searchInput = screen.getByPlaceholderText("...search task");
    fireEvent.change(searchInput, { target: { value: "Task" } });
    expect(mockProps.onSearch).toHaveBeenCalledWith("Task");
  });
});
