import { Header } from "@/components/header";
import LeftNav from "@/components/navigation-menu";
import { PropsWithChildren } from "react";

export default function AppLayout({ children }: PropsWithChildren) {
  return (
    <div className="md:flex sm:block">
      <div className="flex-1 flex-grow-0">
        <LeftNav />
      </div>
      <div className="flex-1 flex-grow">
        <Header />
        <div className="container mx-auto my-5 px-5">{children}</div>
      </div>
    </div>
  );
}
