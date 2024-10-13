import { CurrencyTable } from "@/features/currency/components/currency-table";
import AppLayout from "@/layouts/app-layout";

export default function Home() {
  return (
    <AppLayout>
      <CurrencyTable />
    </AppLayout>
  );
}
