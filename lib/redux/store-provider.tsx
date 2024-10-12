"use client";
import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "./store";
import { currencyService } from "@/services/currency-service";
import { api } from "@/http/api";
import { AuthService } from "@/services/auth-service";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore({
      currencyService,
      authService: AuthService.create(api),
    });
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
