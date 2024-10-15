import React from "react";
import { render, screen } from "@testing-library/react";
import { Header } from ".";
import { StoreProviderRequestSuccess } from "@/testing/store-provider-failed-requests";
import { Toaster } from "../ui/toaster";

jest.mock("next/navigation", () => {
  return {
    useRouter: jest.fn().mockImplementation(() => {
      return {
        push: jest.fn().mockImplementation(),
      };
    }),
  };
});

describe("Header", () => {
  it("renders the Header with all elements", () => {
    render(
      <>
        <Toaster />
        <StoreProviderRequestSuccess>
          <Header />
        </StoreProviderRequestSuccess>
      </>,
    );

    expect(screen.getByRole("banner")).toBeInTheDocument();
  });
});
