import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { PasswordInput } from "./password-input";

describe("PasswordInput", () => {
  it("renders correctly", () => {
    render(<PasswordInput />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.getByTestId("eye-icon")).toBeInTheDocument();
  });

  it("toggles password visibility when button is clicked", () => {
    render(<PasswordInput />);
    const input = screen.getByRole("textbox") as HTMLInputElement;
    const button = screen.getByRole("button");

    expect(input.type).toBe("password");
    expect(screen.getByTestId("eye-icon")).toBeInTheDocument();

    fireEvent.click(button);

    expect(input.type).toBe("text");
    expect(screen.getByTestId("eye-off-icon")).toBeInTheDocument();

    fireEvent.click(button);

    expect(input.type).toBe("password");
    expect(screen.getByTestId("eye-icon")).toBeInTheDocument();
  });

  it("passes props to the Input component", () => {
    render(
      <PasswordInput placeholder="Enter password" className="custom-class" />,
    );
    const input = screen.getByRole("textbox");

    expect(input).toHaveAttribute("placeholder", "Enter password");
    expect(input).toHaveClass("custom-class");
  });

  it("has correct aria-label on the toggle button", () => {
    render(<PasswordInput />);
    const button = screen.getByRole("button");

    expect(button).toHaveAttribute("aria-label", "Show password");

    fireEvent.click(button);

    expect(button).toHaveAttribute("aria-label", "Hide password");
  });

  it("sets autocomplete attribute correctly", () => {
    render(<PasswordInput />);
    const input = screen.getByRole("textbox");

    expect(input).toHaveAttribute("autocomplete", "current-password");
  });
});
