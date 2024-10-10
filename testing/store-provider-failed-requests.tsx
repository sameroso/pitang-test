("use client");
import { useRef } from "react";
import { Provider } from "react-redux";
import { AppStore, makeStore } from "@/lib/redux/store";
import { CurrencyhandlerError } from "./mocks/handlers/currency";

export const StoreMockRequestsError = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore({ currencyService: CurrencyhandlerError });
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
};
