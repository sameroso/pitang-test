import { act, render, screen, waitFor } from "@testing-library/react";
import { CurrencyTable } from "./currency-table";
import StoreProvider from "@/lib/redux/store-provider";
import { fixerResponseMock } from "@/testing/mocks/fixer-api-mock";
import { mapCurrencyToTableValues } from "../convert-base-currency";
import { StoreMockRequestsError } from "@/testing/store-provider-failed-requests";

describe("Currency table tests when fetching", () => {
  it("should show loading component when fetching data", async () => {
    render(
      <StoreProvider>
        <CurrencyTable />
      </StoreProvider>
    );

    expect(screen.getByTestId("loading-table")).toBeInTheDocument();
  });
});

describe("Currency table tests when error", () => {
  it("should render Error component", async () => {
    render(
      <StoreMockRequestsError>
        <CurrencyTable />
      </StoreMockRequestsError>
    );

    await waitFor(() => {
      expect(screen.getByTestId("load-table-error")).toBeInTheDocument();
    });
  });

  it("should try to load data clicking on error retry button", async () => {
    render(
      <StoreMockRequestsError>
        <CurrencyTable />
      </StoreMockRequestsError>
    );

    await waitFor(() => {
      expect(screen.getByTestId("load-table-error")).toBeInTheDocument();
    });

    const element = screen.getByTestId("load-table-error");

    const button = element.querySelector("button");
    button?.click();

    await waitFor(() => {
      expect(screen.getByTestId("loading-table")).toBeInTheDocument();
    });
  });
});

describe("Currency table tests when error", () => {
  it("should render 10 items on the screen in the table after loading items succesfully", async () => {
    render(
      <StoreProvider>
        <CurrencyTable />
      </StoreProvider>
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
    act(() => {
      render(
        <StoreProvider>
          <CurrencyTable />
        </StoreProvider>
      );
    });
    const tableValues = mapCurrencyToTableValues(fixerResponseMock);

    await waitFor(() => {
      expect(screen.getByTestId(tableValues[0].currency)).toBeInTheDocument();
    });

    const button = screen.getByTestId("sort-currency-button");

    act(() => {
      button.click();
    });

    for (let i = tableValues.length - 1; i < tableValues.length - 10; i--) {
      expect(screen.getByTestId(tableValues[i].currency)).toBeInTheDocument();
    }
  });

  it("should sort buttons by rate clicking on column of rate button", async () => {
    act(() => {
      render(
        <StoreProvider>
          <CurrencyTable />
        </StoreProvider>
      );
    });
    const tableValues = mapCurrencyToTableValues(fixerResponseMock);

    await waitFor(() => {
      expect(screen.getByTestId(tableValues[0].currency)).toBeInTheDocument();
    });

    const button = screen.getByTestId("sort-rate-button");

    act(() => {
      button.click();
    });

    expect(screen.getByTestId("BTC")).toBeInTheDocument();
  });

  it("should go to next page clicking on next button", async () => {
    act(() => {
      render(
        <StoreProvider>
          <CurrencyTable />
        </StoreProvider>
      );
    });
    const tableValues = mapCurrencyToTableValues(fixerResponseMock);

    await waitFor(() => {
      expect(screen.getByTestId(tableValues[0].currency)).toBeInTheDocument();
    });

    const button = screen.getByTestId("next-button");

    act(() => {
      button.click();
    });

    for (let i = 10; i < 20; i++) {
      expect(screen.getByTestId(tableValues[i].currency)).toBeInTheDocument();
    }
  });

  it("previous button should be initially disabled", async () => {
    act(() => {
      render(
        <StoreProvider>
          <CurrencyTable />
        </StoreProvider>
      );
    });
    const tableValues = mapCurrencyToTableValues(fixerResponseMock);

    await waitFor(() => {
      expect(screen.getByTestId(tableValues[0].currency)).toBeInTheDocument();
    });

    const button = screen.getByTestId("previous-button");

    expect(button).toBeDisabled();
  });

  it("should go to previous page clicking on previous button", async () => {
    act(() => {
      render(
        <StoreProvider>
          <CurrencyTable />
        </StoreProvider>
      );
    });
    const tableValues = mapCurrencyToTableValues(fixerResponseMock);

    await waitFor(() => {
      expect(screen.getByTestId(tableValues[0].currency)).toBeInTheDocument();
    });

    const nextButton = screen.getByTestId("next-button");

    act(() => {
      nextButton.click();
    });

    for (let i = 10; i < 20; i++) {
      expect(screen.getByTestId(tableValues[i].currency)).toBeInTheDocument();
    }

    const previousButton = screen.getByTestId("previous-button");

    act(() => {
      previousButton.click();
    });

    for (let i = 0; i < 10; i++) {
      expect(screen.getByTestId(tableValues[i].currency)).toBeInTheDocument();
    }
  });
});
