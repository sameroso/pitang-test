import { render, screen } from "@testing-library/react";
import { Input } from "./input";

describe("Table tests", () => {
  it("should render input correctly", () => {
    render(<Input />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("should input match snapshot", () => {
    const { container } = render(<Input />);
    expect(container).toMatchSnapshot();
  });
});
