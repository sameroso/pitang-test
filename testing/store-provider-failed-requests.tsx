("use client");

import StoreProvider from "@/lib/redux/store-provider";
import { currencyService } from "@/services/currency-service";
import { PropsWithChildren } from "react";
import { authMockServiceSuccess } from "./mocks/services-mock.ts/auth-mock-service";

export const StoreProviderRequestSuccess = ({
  children,
}: PropsWithChildren) => {
  return (
    <StoreProvider
      extraArgument={{
        authService: authMockServiceSuccess,
        currencyService: currencyService,
      }}
    >
      {children}
    </StoreProvider>
  );
};
