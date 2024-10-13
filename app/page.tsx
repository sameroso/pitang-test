import { Header } from "@/components/header";
import { CurrencyTable } from "@/features/currency/components/currency-table";

export default function Home() {
  return (
    <>
      <Header />
      <div className="container mx-auto my-5">
        <CurrencyTable />
      </div>
    </>
  );
}
