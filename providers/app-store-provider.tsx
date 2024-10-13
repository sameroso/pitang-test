"use client";

import StoreProvider from "@/lib/redux/store-provider";
import { authService } from "@/services/auth-service";
import { currencyService } from "@/services/currency-service";
import { PropsWithChildren } from "react";

export default function AppStoreProvider({ children }: PropsWithChildren) {
  return (
    <StoreProvider
      extraArgument={{
        authService: authService,
        currencyService: currencyService,
      }}
    >
      {children}
    </StoreProvider>
  );
}
