"use client";
import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "./store";
import { currencyService } from "@/services/currency-service";
import { authService } from "@/services/auth-service";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    storeRef.current = makeStore({
      currencyService,
      authService: authService,
    });
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
