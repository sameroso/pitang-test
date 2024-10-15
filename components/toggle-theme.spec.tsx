import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeToggle } from "./toggle-theme";
import { useAppTheme } from "@/hooks/use-app-theme";

// Mock the useAppTheme hook
jest.mock("@/hooks/use-app-theme", () => ({
  useAppTheme: jest.fn(),
}));

jest.mock("@/components/ui/dropdown-menu", () => ({
  DropdownMenu: ({ children }: React.PropsWithChildren) => (
    <div>{children}</div>
  ),
  DropdownMenuTrigger: ({ children }: React.PropsWithChildren) => (
    <div>{children}</div>
  ),
  DropdownMenuContent: ({ children }: React.PropsWithChildren) => (
    <div>{children}</div>
  ),
  DropdownMenuItem: ({ children, ...props }: React.PropsWithChildren) => (
    <button {...props}>{children}</button>
  ),
}));

jest.mock("lucide-react", () => ({
  Sun: () => <svg data-testid="sun-icon" />,
  Moon: () => <svg data-testid="moon-icon" />,
}));

describe("ThemeToggle", () => {
  const mockSetTheme = jest.fn();

  beforeEach(() => {
    (useAppTheme as jest.Mock).mockReturnValue({ setTheme: mockSetTheme });
  });

  it("renders the component with all elements", () => {
    render(<ThemeToggle />);

    expect(screen.getByTestId("sun-icon")).toBeInTheDocument();
    expect(screen.getByTestId("moon-icon")).toBeInTheDocument();
    expect(screen.getByText("Mudar Tema")).toBeInTheDocument();
    expect(screen.getByText("Claro")).toBeInTheDocument();
    expect(screen.getByText("Escuro")).toBeInTheDocument();
  });

  it('calls setTheme with "light" when clicking on "Claro"', () => {
    render(<ThemeToggle />);

    fireEvent.click(screen.getByTestId("open-menu-button"));

    fireEvent.click(screen.getByText("Claro"));
    expect(mockSetTheme).toHaveBeenCalledWith({ mode: "light" });
  });

  it('calls setTheme with "dark" when clicking on "Escuro"', () => {
    render(<ThemeToggle />);
    fireEvent.click(screen.getByTestId("open-menu-button"));
    fireEvent.click(screen.getByText("Escuro"));
    expect(mockSetTheme).toHaveBeenCalledWith({ mode: "dark" });
  });

  it("has correct accessibility attributes", () => {
    render(<ThemeToggle />);

    const srOnlyText = screen.getByText("Mudar Tema");
    expect(srOnlyText).toHaveClass("sr-only");
  });
});
