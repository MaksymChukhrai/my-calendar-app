import { render, screen, fireEvent } from "@testing-library/react";
import Calendar from "./Calendar";

describe("Calendar Component", () => {
  it("renders calendar grid with 42 cells", () => {
    render(<Calendar />);
    expect(screen.getByRole("grid")).toBeInTheDocument();
    expect(screen.getAllByRole("gridcell")).toHaveLength(42); // 6 недель по 7 дней
  });

  it("handles task creation when clicking on a day", () => {
    render(<Calendar />);
    const dayCell = screen.getAllByRole("gridcell")[10];
    fireEvent.click(dayCell);
    expect(dayCell).toContainElement(screen.getByText("New Task")); // Пример текста задачи
  });

  it("filters tasks based on search term", () => {
    render(<Calendar />);
    const searchInput = screen.getByPlaceholderText("...search task");
    fireEvent.change(searchInput, { target: { value: "Meeting" } });
    const filteredTasks = screen.getAllByText(/Meeting/i);
    expect(filteredTasks).toHaveLength(2); // Ожидаемое количество задач
  });
});

