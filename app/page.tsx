"use client";
import { Header } from "@/components/header";
import { CurrencyTable } from "@/features/currency/components/currency-table";

export default function Home() {
  return (
    <>
      <Header />
      <CurrencyTable />
    </>
  );
}
