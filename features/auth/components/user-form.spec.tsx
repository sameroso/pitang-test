import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { UserForm, UserFormProps } from "./user-form";
import {
  createUserSchema,
  edituserSchema,
  UserFormValues,
} from "./user-schema";

describe("SignupForm", () => {
  const defaultProps: UserFormProps = {
    onSubmit: jest.fn(),
    schema: createUserSchema,
  };

  it("renders the form fields", () => {
    render(<UserForm {...defaultProps} />);

    expect(screen.getByLabelText("First Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Last Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Country")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Senha")).toBeInTheDocument();
  });

  describe("with createUserSchema", () => {
    it("submits the form with valid data", async () => {
      const onSubmit = jest.fn();
      render(<UserForm {...defaultProps} onSubmit={onSubmit} />);

      fireEvent.change(screen.getByLabelText("First Name"), {
        target: { value: "John" },
      });
      fireEvent.change(screen.getByLabelText("Last Name"), {
        target: { value: "Doe" },
      });
      fireEvent.click(screen.getByLabelText("Country"));

      fireEvent.click(screen.getByTestId("BR"));
      fireEvent.change(screen.getByLabelText("Email"), {
        target: { value: "john@example.com" },
      });
      fireEvent.change(screen.getByLabelText("Senha"), {
        target: { value: "password123" },
      });

      fireEvent.submit(screen.getByRole("form"));

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledWith({
          firstName: "John",
          lastName: "Doe",
          country: "BR",
          email: "john@example.com",
          password: "password123",
        });
      });
    });

    it("displays error messages for invalid data", async () => {
      render(<UserForm {...defaultProps} />);

      fireEvent.submit(screen.getByRole("form"));

      await waitFor(() => {
        expect(
          screen.getByText("Nome deve ter pelo menos 2 caracteres"),
        ).toBeInTheDocument();
        expect(
          screen.getByText("Sobrenome deve ter pelo menos 2 caracteres"),
        ).toBeInTheDocument();
        expect(
          screen.getByText("É necesário selecionar um país"),
        ).toBeInTheDocument();
        expect(screen.getByText("Email inválido")).toBeInTheDocument();
        expect(
          screen.getByText("Senha precisa conter no mínimo 8 caracteres"),
        ).toBeInTheDocument();
      });
    });
  });

  describe("with edituserSchema", () => {
    const editProps: UserFormProps = {
      ...defaultProps,
      schema: edituserSchema,
    };

    it("submits the form with valid data", async () => {
      const onSubmit = jest.fn();
      render(
        <UserForm {...editProps} onSubmit={onSubmit}>
          <button type="submit"></button>
        </UserForm>,
      );

      fireEvent.change(screen.getByLabelText("First Name"), {
        target: { value: "John" },
      });
      fireEvent.change(screen.getByLabelText("Last Name"), {
        target: { value: "Doe" },
      });
      fireEvent.change(screen.getByLabelText("Email"), {
        target: { value: "john@example.com" },
      });

      fireEvent.click(screen.getByLabelText("Country"));

      fireEvent.click(screen.getByTestId("BR"));

      fireEvent.change(screen.getByLabelText("Senha"), {
        target: { value: "password123" },
      });

      fireEvent.submit(screen.getByRole("form"));

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledWith({
          firstName: "John",
          lastName: "Doe",
          email: "john@example.com",
          password: "password123",
          country: "BR",
        });
      });
    });

    it("allows empty fields", async () => {
      const onSubmit = jest.fn();
      render(<UserForm {...editProps} onSubmit={onSubmit} />);

      fireEvent.submit(screen.getByRole("form"));

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledWith({
          firstName: "",
          lastName: "",
          country: "",
          email: "",
          password: "",
        });
      });
    });

    it("displays error message for invalid email", async () => {
      render(<UserForm {...editProps} />);

      fireEvent.change(screen.getByLabelText("Email"), {
        target: { value: "invalid-email" },
      });
      fireEvent.submit(screen.getByRole("form"));

      await waitFor(() => {
        expect(screen.getByText("Email inválido")).toBeInTheDocument();
      });
    });
  });

  it("uses default values when provided", () => {
    const defaultValues: UserFormValues = {
      firstName: "Jane",
      lastName: "Doe",
      country: "US",
      email: "jane@example.com",
      password: "password456",
    };

    render(<UserForm {...defaultProps} defaultValues={defaultValues} />);

    expect(screen.getByLabelText("First Name")).toHaveValue("Jane");
    expect(screen.getByLabelText("Last Name")).toHaveValue("Doe");
    expect(screen.getByLabelText("Email")).toHaveValue("jane@example.com");
    expect(screen.getByLabelText("Senha")).toHaveValue("password456");
  });

  it("renders children when provided", () => {
    render(
      <UserForm {...defaultProps}>
        <button type="submit">Custom Submit</button>
      </UserForm>,
    );

    expect(screen.getByText("Custom Submit")).toBeInTheDocument();
  });
});
