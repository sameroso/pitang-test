"use client";
import { ReactNode, useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore, ExtraArgument } from "./store";

export interface StoreProviderProps {
  extraArgument: ExtraArgument;
  children: ReactNode;
}
export default function StoreProvider({
  children,
  extraArgument,
}: StoreProviderProps) {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    storeRef.current = makeStore(extraArgument);
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
