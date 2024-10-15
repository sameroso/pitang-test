import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ChangeThemeColorInput } from "./change-theme-color-input";

describe("ChangeThemeColorInput", () => {
  const mockInputColorSelectorProps = {
    onChange: jest.fn(),
  };
  const mockInputProps = {
    onChange: jest.fn(),
  };
  const mockResetButtonProps = {
    onClick: jest.fn(),
  };

  it("renders the component with all elements", () => {
    render(
      <ChangeThemeColorInput
        InputColorSelectorProps={mockInputColorSelectorProps}
        InputProps={mockInputProps}
        ResetButtonProps={mockResetButtonProps}
      />,
    );

    expect(screen.getByTestId("input-text")).toBeInTheDocument();
    expect(screen.getByTestId("input-color")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("calls onChange when color input changes", () => {
    render(
      <ChangeThemeColorInput
        InputColorSelectorProps={mockInputColorSelectorProps}
        InputProps={mockInputProps}
        ResetButtonProps={mockResetButtonProps}
      />,
    );

    const colorInput = screen.getByTestId("input-color");
    fireEvent.change(colorInput, { target: { value: "#ffffff" } });
    expect(mockInputColorSelectorProps.onChange).toHaveBeenCalled();
  });

  it("calls onChange when main input changes", () => {
    render(
      <ChangeThemeColorInput
        InputColorSelectorProps={mockInputColorSelectorProps}
        InputProps={mockInputProps}
        ResetButtonProps={mockResetButtonProps}
      />,
    );

    const mainInput = screen.getByTestId("input-text");
    fireEvent.change(mainInput, { target: { value: "#000000" } });
    expect(mockInputProps.onChange).toHaveBeenCalled();
  });

  it("calls onClick when reset button is clicked", () => {
    render(
      <ChangeThemeColorInput
        InputColorSelectorProps={mockInputColorSelectorProps}
        InputProps={mockInputProps}
        ResetButtonProps={mockResetButtonProps}
      />,
    );

    const resetButton = screen.getByRole("button");
    fireEvent.click(resetButton);
    expect(mockResetButtonProps.onClick).toHaveBeenCalled();
  });
});
