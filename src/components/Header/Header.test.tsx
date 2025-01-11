import { render, screen } from "@testing-library/react";
import Header from "./Header";

describe("Header Component", () => {
  it("renders header with all required elements", () => {
    render(<Header />);
    expect(screen.getByText("TeamSync Calendar")).toBeInTheDocument();
    expect(screen.getByAltText("Airplane Icon")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /calendar/i })).toBeInTheDocument();
  });

  it("meets accessibility requirements", () => {
    render(<Header />);
    const logo = screen.getByAltText("Airplane Icon");
    expect(logo).toHaveAttribute("src", "/airplane-icon.png");
  });
});
