import { render } from "@testing-library/react";
import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";
import { act } from "react";
import Calendar from "./Calendar";
import type { ReactNode } from "react";
import type { RenderResult } from "@testing-library/react";

vi.mock("uuid", () => ({
  v4: () => "test-uuid",
}));

vi.mock("@hello-pangea/dnd", () => ({
  DragDropContext: ({ children }: { children: ReactNode }) => children,
  Droppable: ({ children }: { children: (provided: any) => ReactNode }) =>
    children({
      droppableProps: {},
      innerRef: null,
    }),
  Draggable: ({ children }: { children: (provided: any) => ReactNode }) =>
    children({
      draggableProps: {},
      dragHandleProps: {},
      innerRef: null,
    }),
}));

// Holiday Service Mok
vi.mock("../../services/holidaysApi", () => ({
  HolidaysService: {
    getHolidaysByYear: vi.fn().mockResolvedValue({}),
  },
}));

describe("Calendar Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    // Clearing the virtual DOM after each test
    document.body.innerHTML = "";
  });

  test("renders calendar grid", async () => {
    let container: HTMLElement | null = null;
    await act(async () => {
      const renderResult: RenderResult = render(<Calendar />);
      container = renderResult.container;
    });
    expect(container).not.toBeNull();
    const grid = container!.querySelector('[role="grid"]');
    expect(grid).toBeInTheDocument();
  });

  test("renders correct number of days", async () => {
    let container: HTMLElement | null = null;
    await act(async () => {
      const renderResult: RenderResult = render(<Calendar />);
      container = renderResult.container;
    });
    expect(container).not.toBeNull();
    const cells = container!.querySelectorAll('[role="gridcell"]');
    expect(cells.length).toBe(42); // 6 weeks * 7 days
  });

  test("renders week days header", async () => {
    let getByText: RenderResult["getByText"] | undefined;
    await act(async () => {
      const renderResult: RenderResult = render(<Calendar />);
      getByText = renderResult.getByText;
    });
    expect(getByText).not.toBeUndefined();
    expect(getByText!("Sun")).toBeInTheDocument();
    expect(getByText!("Mon")).toBeInTheDocument();
    expect(getByText!("Sat")).toBeInTheDocument();
  });
});
