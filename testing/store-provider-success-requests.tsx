("use client");

import StoreProvider from "@/lib/redux/store-provider";
import { PropsWithChildren } from "react";
import { authMockServiceSuccess } from "./mocks/services-mock.ts/auth-mock-service";
import { GetCurrencySuccessMockService } from "./mocks/services-mock.ts/currency-service-mock";

export const StoreProviderRequestSuccess = ({
  children,
}: PropsWithChildren) => {
  return (
    <StoreProvider
      extraArgument={{
        authService: authMockServiceSuccess,
        currencyService: GetCurrencySuccessMockService,
      }}
    >
      {children}
    </StoreProvider>
  );
};
