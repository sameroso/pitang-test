import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Input } from "./input";
import { createRef } from "react";

describe("Input Component", () => {
  it("renders correctly", () => {
    render(<Input data-testid="test-input" />);
    const input = screen.getByTestId("test-input");
    expect(input).toBeInTheDocument();
    expect(input).toHaveClass(
      "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
    );
  });

  it("applies custom className", () => {
    render(<Input data-testid="test-input" className="custom-class" />);
    expect(screen.getByTestId("test-input")).toHaveClass("custom-class");
  });

  it("forwards ref correctly", () => {
    const ref = createRef<HTMLInputElement>();
    render(<Input ref={ref} data-testid="test-input" />);
    expect(ref.current).toBe(screen.getByTestId("test-input"));
  });

  it("handles different input types", () => {
    render(<Input type="password" data-testid="test-input" />);
    expect(screen.getByTestId("test-input")).toHaveAttribute(
      "type",
      "password",
    );
  });

  it("handles disabled state", () => {
    render(<Input disabled data-testid="test-input" />);
    expect(screen.getByTestId("test-input")).toBeDisabled();
  });

  it("handles placeholder text", () => {
    render(<Input placeholder="Enter text" data-testid="test-input" />);
    expect(screen.getByTestId("test-input")).toHaveAttribute(
      "placeholder",
      "Enter text",
    );
  });

  it("handles value changes", async () => {
    const handleChange = jest.fn();
    render(<Input onChange={handleChange} data-testid="test-input" />);
    const input = screen.getByTestId("test-input");
    await userEvent.type(input, "Hello");
    expect(handleChange).toHaveBeenCalledTimes(5);
    expect(input).toHaveValue("Hello");
  });

  it("applies focus styles on focus", async () => {
    render(<Input data-testid="test-input" />);
    const input = screen.getByTestId("test-input");
    await userEvent.click(input);
    expect(input).toHaveFocus();
  });

  it("handles file input type", () => {
    render(<Input type="file" data-testid="test-input" />);
    const input = screen.getByTestId("test-input");
    expect(input).toHaveAttribute("type", "file");
    expect(input).toHaveClass(
      "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",
    );
  });

  it("is accessible", () => {
    render(<Input aria-label="Test input" data-testid="test-input" />);
    const input = screen.getByTestId("test-input");
    expect(input).toHaveAttribute("aria-label", "Test input");
  });
});
