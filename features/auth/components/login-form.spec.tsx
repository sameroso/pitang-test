import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { LoginForm } from "./login-form";
import "@testing-library/jest-dom";

describe("LoginForm", () => {
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  it("renders the form with email and password fields", () => {
    render(<LoginForm onSubmit={mockOnSubmit} />);

    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Senha")).toBeInTheDocument();
  });

  it("displays error messages for invalid inputs", async () => {
    render(<LoginForm onSubmit={mockOnSubmit} />);

    fireEvent.submit(screen.getByRole("form"));

    await waitFor(() => {
      expect(
        screen.getByText("Senha precisa conter no mínimo 8 caracteres")
      ).toBeInTheDocument();
      expect(screen.getByText("Email Inválido")).toBeInTheDocument();
    });
  });

  it("displays specific error message for invalid email", async () => {
    render(<LoginForm onSubmit={mockOnSubmit} />);

    fireEvent.input(screen.getByLabelText("Email"), {
      target: { value: "invalid-email" },
    });
    fireEvent.submit(screen.getByRole("form"));

    await waitFor(() => {
      expect(screen.getByText("Email Inválido")).toBeInTheDocument();
    });
  });

  it("calls onSubmit with form data when inputs are valid", async () => {
    render(<LoginForm onSubmit={mockOnSubmit} />);

    fireEvent.input(screen.getByLabelText("Email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.input(screen.getByLabelText("Senha"), {
      target: { value: "password123" },
    });

    fireEvent.submit(screen.getByRole("form"));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "password123",
      });
    });
  });

  it("renders children components", () => {
    render(
      <LoginForm onSubmit={mockOnSubmit}>
        <button type="submit">Login</button>
      </LoginForm>
    );

    expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
  });

  it("sets correct autocomplete attributes", () => {
    render(<LoginForm onSubmit={mockOnSubmit} />);

    expect(screen.getByLabelText("Email")).toHaveAttribute(
      "autocomplete",
      "username"
    );
  });

  it("uses placeholder for email input", () => {
    render(<LoginForm onSubmit={mockOnSubmit} />);

    expect(screen.getByLabelText("Email")).toHaveAttribute(
      "placeholder",
      "m@example.com"
    );
  });
});
