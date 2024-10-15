import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import LoginPage from "../page";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { StoreProviderRequestSuccess } from "@/testing/store-provider-failed-requests";
import StoreProvider from "@/lib/redux/store-provider";
import { authMockServiceError } from "@/testing/mocks/services-mock.ts/auth-mock-service";
import { currencyService } from "@/services/currency-service";

// Mock the dependencies
jest.mock("@/hooks/use-toast", () => ({
  useToast: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@/components/toggle-theme", () => ({
  ThemeToggle: () => <div data-testid="theme-toggle">Theme Toggle</div>,
}));

describe("LoginPage", () => {
  const mockToast = jest.fn();
  const mockPush = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useToast as jest.Mock).mockReturnValue({ toast: mockToast });
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  });

  it("submits the form with correct data", async () => {
    render(
      <StoreProviderRequestSuccess>
        <LoginPage />
      </StoreProviderRequestSuccess>
    );

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/senha/i), {
      target: { value: "password123" },
    });

    screen.debug(screen.getByRole("button", { name: "Login" }));

    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Login" }));
    });

    await waitFor(() => {
      expect(mockToast).toHaveBeenCalledWith({
        title: "Login feito com sucesso",
        description: "Bem vindo de volta, john!",
      });
    });

    expect(mockPush).toHaveBeenCalledWith("/");
  });

  it("shows an error toast when login fails", async () => {
    render(
      <StoreProvider
        extraArgument={{
          authService: authMockServiceError,
          currencyService: currencyService,
        }}
      >
        <LoginPage />
      </StoreProvider>
    );

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/senha/i), {
      target: { value: "wrongpassword" },
    });

    screen.debug(screen.getByRole("button", { name: "Login" }));

    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Login" }));
    });

    await waitFor(() => {
      expect(mockToast).toHaveBeenCalledWith(
        expect.objectContaining({
          title: "Ocorreu algum problema",
          variant: "destructive",
        })
      );

      expect(mockPush).not.toHaveBeenCalled();
    });
  });

  it("disables the submit button when loading", async () => {
    render(
      <StoreProviderRequestSuccess>
        <LoginPage />
      </StoreProviderRequestSuccess>
    );

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/senha/i), {
      target: { value: "password123" },
    });

    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Login" }));
    });

    await waitFor(() => {
      screen.getByRole("button", { name: "Logging in..." });
    });
    expect(
      screen.getByRole("button", { name: "Logging in..." })
    ).toBeDisabled();
  });

  it("renders the theme toggle", () => {
    render(
      <StoreProviderRequestSuccess>
        <LoginPage />
      </StoreProviderRequestSuccess>
    );
    expect(screen.getByTestId("theme-toggle")).toBeInTheDocument();
  });

  it("renders the signup link", () => {
    render(
      <StoreProviderRequestSuccess>
        <LoginPage />
      </StoreProviderRequestSuccess>
    );
    const signupLink = screen.getByRole("link", { name: "Não tem uma conta?" });
    expect(signupLink).toBeInTheDocument();
    expect(signupLink).toHaveAttribute("href", "/auth/signup");
  });
});
