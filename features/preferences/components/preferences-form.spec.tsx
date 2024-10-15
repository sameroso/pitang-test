import { UserPreferencesForm } from "./preferences-form";
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useAppTheme } from "@/hooks/use-app-theme";
import { ThemeProvider } from "@/lib/styles/theme-provider";
import { COLORS } from "@/style/constants";
import { hslToHex } from "@/style/utils";

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

window.ResizeObserver =
  window.ResizeObserver ||
  jest.fn().mockImplementation(() => ({
    disconnect: jest.fn(),
    observe: jest.fn(),
    unobserve: jest.fn(),
  }));

jest.mock("@/hooks/use-app-theme", () => ({
  useAppTheme: jest.fn(),
}));

describe("UserPreferencesForm", () => {
  const mockSetTheme = jest.fn();
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    (useAppTheme as jest.Mock).mockReturnValue({
      setTheme: mockSetTheme,
      theme: "light",
    });
  });

  it("renders the form with all fields", () => {
    render(
      <ThemeProvider>
        <UserPreferencesForm onSubmit={mockOnSubmit} />
      </ThemeProvider>,
    );

    expect(screen.getByLabelText("Claro")).toBeInTheDocument();
    expect(screen.getByLabelText("Escuro")).toBeInTheDocument();
    expect(
      screen.getByLabelText("Cor Primária Modo Claro"),
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText("Cor Secundária Modo Claro"),
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText("Cor Primária Modo Escuro"),
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText("Cor Secundária Modo Escuro"),
    ).toBeInTheDocument();
  });

  it("calls onSubmit with form values when form is submitted", async () => {
    render(<UserPreferencesForm onSubmit={mockOnSubmit} />);

    fireEvent.click(screen.getByLabelText("Escuro"));
    fireEvent.change(screen.getByLabelText("Cor Primária Modo Claro"), {
      target: { value: "#ffffff" },
    });
    fireEvent.submit(screen.getByRole("form"));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          preferredMode: "dark",
          lightModePrimary: "#ffffff",
        }),
      );
    });
  });

  it("updates theme when mode is changed", () => {
    render(<UserPreferencesForm onSubmit={mockOnSubmit} />);

    fireEvent.click(screen.getByLabelText("Escuro"));

    expect(mockSetTheme).toHaveBeenCalledWith(
      expect.objectContaining({
        mode: "dark",
      }),
    );
  });

  it("updates theme when color is changed", () => {
    render(<UserPreferencesForm onSubmit={mockOnSubmit} />);

    fireEvent.change(screen.getByLabelText("Cor Primária Modo Claro"), {
      target: { value: "#ffffff" },
    });

    expect(mockSetTheme).toHaveBeenCalledWith(
      expect.objectContaining({
        primary_color: expect.objectContaining({
          light: "#ffffff",
        }),
      }),
    );
  });

  it("resets colors to default when reset button is clicked", () => {
    render(<UserPreferencesForm onSubmit={mockOnSubmit} />);

    fireEvent.change(screen.getByLabelText("Cor Primária Modo Claro"), {
      target: { value: "#ffffff" },
    });
    const resetButtons = screen.getAllByRole("button", { name: /reset/i });
    fireEvent.click(resetButtons[0]);

    expect(mockSetTheme).toHaveBeenCalledWith(
      expect.objectContaining({
        primary_color: expect.objectContaining({
          light: hslToHex(COLORS.light.primary),
        }),
      }),
    );
  });

  it("changes colors changing input", async () => {
    render(
      <ThemeProvider>
        <UserPreferencesForm onSubmit={mockOnSubmit} />
      </ThemeProvider>,
    );

    fireEvent.change(screen.getByLabelText("Cor Primária Modo Claro"), {
      target: { value: "#ffffff" },
    });
    fireEvent.change(screen.getByLabelText("Cor Secundária Modo Claro"), {
      target: { value: "#444337" },
    });
    fireEvent.change(screen.getByLabelText("Cor Primária Modo Escuro"), {
      target: { value: "#fffccc" },
    });
    fireEvent.change(screen.getByLabelText("Cor Secundária Modo Escuro"), {
      target: { value: "#fff123" },
    });

    fireEvent.submit(screen.getByRole("form"));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          lightModePrimary: "#ffffff",
          lightModeSecondary: "#444337",
          darkModePrimary: "#fffccc",
          darkModeSecondary: "#fff123",
        }),
      );
    });
  });

  it("renders and submit the form with all default values", async () => {
    const defaultValues = {
      darkModePrimary: "#fff123",
      darkModeSecondary: "#f43566",
      lightModePrimary: "#042222",
      lightModeSecondary: "#f12111",
      preferredMode: "dark" as const,
    };

    render(
      <ThemeProvider>
        <UserPreferencesForm
          onSubmit={mockOnSubmit}
          defaultValues={defaultValues}
        />
      </ThemeProvider>,
    );

    fireEvent.submit(screen.getByRole("form"));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith(defaultValues);
    });
  });

  it("renders and the form with all default system default values when there is no default values args", async () => {
    render(
      <ThemeProvider>
        <UserPreferencesForm onSubmit={mockOnSubmit} />
      </ThemeProvider>,
    );

    fireEvent.submit(screen.getByRole("form"));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          lightModePrimary: hslToHex(COLORS.light.primary),
          lightModeSecondary: hslToHex(COLORS.light.secondary),
          darkModePrimary: hslToHex(COLORS.dark.primary),
          darkModeSecondary: hslToHex(COLORS.dark.secondary),
        }),
      );
    });
  });
});
