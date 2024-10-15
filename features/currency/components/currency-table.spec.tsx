import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { CurrencyTable } from "./currency-table";
import StoreProvider from "@/lib/redux/store-provider";
import { fixerResponseMock } from "@/testing/mocks/fixer-api-mock";
import { mapCurrencyToTableValues } from "../convert-base-currency";
import { StoreProviderRequestSuccess } from "@/testing/store-provider-failed-requests";
import { act } from "react";
import { authMockServiceSuccess } from "@/testing/mocks/services-mock.ts/auth-mock-service";
import { getCurrencyError } from "@/testing/mocks/handlers/currency";

describe("Currency table tests when fetching", () => {
  it("should show loading component when fetching data", async () => {
    await act(() =>
      render(
        <StoreProviderRequestSuccess>
          <CurrencyTable />
        </StoreProviderRequestSuccess>,
      ),
    );

    expect(screen.getByTestId("loading-table")).toBeInTheDocument();
  });
});

describe("Currency table tests when error", () => {
  it("should render Error component", async () => {
    await act(() =>
      render(
        <StoreProvider
          extraArgument={{
            authService: authMockServiceSuccess,
            currencyService: { getCurrencies: getCurrencyError },
          }}
        >
          <CurrencyTable />
        </StoreProvider>,
      ),
    );

    await waitFor(() => {
      expect(screen.getByTestId("load-table-error")).toBeInTheDocument();
    });
  });

  it("should try to load data clicking on error retry button", async () => {
    await act(() =>
      render(
        <StoreProvider
          extraArgument={{
            authService: authMockServiceSuccess,
            currencyService: { getCurrencies: getCurrencyError },
          }}
        >
          <CurrencyTable />
        </StoreProvider>,
      ),
    );

    await waitFor(() => {
      expect(screen.getByTestId("load-table-error")).toBeInTheDocument();
    });

    const button = screen.getByRole("button", { name: /Tentar Novamente/i });

    await act(() => fireEvent.click(button));

    await waitFor(() => {
      expect(screen.getByTestId("loading-table")).toBeInTheDocument();
    });
  });
});

describe("Currency table tests when table load with success", () => {
  it("should render 10 items on the screen in the table after loading items succesfully", async () => {
    await act(() =>
      render(
        <StoreProviderRequestSuccess>
          <CurrencyTable />
        </StoreProviderRequestSuccess>,
      ),
    );
    const tableValues = mapCurrencyToTableValues(fixerResponseMock);

    await waitFor(() => {
      expect(screen.getByTestId(tableValues[0].currency)).toBeInTheDocument();
    });

    for (let i = 0; i < 10; i++) {
      expect(screen.getByTestId(tableValues[i].currency)).toBeInTheDocument();
    }
  });

  it("should reverse currency order clicking on table column header currency button", async () => {
    await act(() =>
      render(
        <StoreProviderRequestSuccess>
          <CurrencyTable />
        </StoreProviderRequestSuccess>,
      ),
    );

    const tableValues = mapCurrencyToTableValues(fixerResponseMock);

    await waitFor(() => {
      expect(screen.getByTestId(tableValues[0].currency)).toBeInTheDocument();
    });

    const button = screen.getByTestId("sort-currency-button");

    await act(() => fireEvent.click(button));

    for (let i = tableValues.length - 1; i < tableValues.length - 10; i--) {
      expect(screen.getByTestId(tableValues[i].currency)).toBeInTheDocument();
    }
  });

  it("should sort buttons by rate clicking on column of rate button", async () => {
    await act(() =>
      render(
        <StoreProviderRequestSuccess>
          <CurrencyTable />
        </StoreProviderRequestSuccess>,
      ),
    );

    const tableValues = mapCurrencyToTableValues(fixerResponseMock);

    await waitFor(() => {
      expect(screen.getByTestId(tableValues[0].currency)).toBeInTheDocument();
    });

    const button = screen.getByTestId("sort-rate-button");

    await act(() => fireEvent.click(button));

    expect(screen.getByTestId("BTC")).toBeInTheDocument();
  });

  it("should go to next page clicking on next button", async () => {
    await act(() =>
      render(
        <StoreProviderRequestSuccess>
          <CurrencyTable />
        </StoreProviderRequestSuccess>,
      ),
    );

    const tableValues = mapCurrencyToTableValues(fixerResponseMock);

    await waitFor(() => {
      expect(screen.getByTestId(tableValues[0].currency)).toBeInTheDocument();
    });

    const button = screen.getByTestId("next-button");

    await act(() => fireEvent.click(button));

    for (let i = 10; i < 20; i++) {
      expect(screen.getByTestId(tableValues[i].currency)).toBeInTheDocument();
    }
  });

  it("previous button should be initially disabled", async () => {
    await act(() =>
      render(
        <StoreProviderRequestSuccess>
          <CurrencyTable />
        </StoreProviderRequestSuccess>,
      ),
    );

    const tableValues = mapCurrencyToTableValues(fixerResponseMock);

    await waitFor(() => {
      expect(screen.getByTestId(tableValues[0].currency)).toBeInTheDocument();
    });

    const button = screen.getByTestId("previous-button");

    expect(button).toBeDisabled();
  });

  it("should go to previous page clicking on previous button", async () => {
    await act(() =>
      render(
        <StoreProviderRequestSuccess>
          <CurrencyTable />
        </StoreProviderRequestSuccess>,
      ),
    );

    const tableValues = mapCurrencyToTableValues(fixerResponseMock);

    await waitFor(() => {
      expect(screen.getByTestId(tableValues[0].currency)).toBeInTheDocument();
    });

    const nextButton = screen.getByTestId("next-button");

    await act(() => fireEvent.click(nextButton));

    for (let i = 10; i < 20; i++) {
      expect(screen.getByTestId(tableValues[i].currency)).toBeInTheDocument();
    }

    const previousButton = screen.getByTestId("previous-button");

    await act(() => fireEvent.click(previousButton));

    for (let i = 0; i < 10; i++) {
      expect(screen.getByTestId(tableValues[i].currency)).toBeInTheDocument();
    }
  });
});
