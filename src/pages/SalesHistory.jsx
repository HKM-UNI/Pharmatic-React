import { useSalesHistory } from "@/hooks/sales_hooks";
import DynamicPanel from "@/shared/DynamicPanel";
import {
  Banknote,
  CalendarDays,
  ShoppingCart,
  UserRound,
  UserRoundX,
} from "lucide-react";
import Error from "./Error";
import LoadingPanel from "./LoadingPanel";

function SalesCard({ children }) {
  return (
    <div className="2xl:text-md flex flex-col rounded-lg bg-gray-100 p-5 text-sm shadow-md transition delay-150 ease-in-out hover:-translate-y-1 hover:scale-102 hover:drop-shadow-md">
      {children}
    </div>
  );
}

export default function SalesHistory() {
  const [sales, isLoading, error] = useSalesHistory();

  if (error) {
    return <Error message="No se pudieron cargar las ventas." />;
  }

  if (isLoading) {
    return <LoadingPanel />;
  }

  return (
    <DynamicPanel>
      <div className="grid h-full grid-cols-1 gap-6 p-6 md:grid-cols-2 2xl:grid-cols-3">
        {sales.map((s) => (
          <SalesCard key={s.invoiceNo}>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-lg font-semibold">
                <div className="inline-flex items-center gap-2 text-teal-600">
                  <Banknote />
                  {s.salesAmount}
                </div>
                <div className="inline-flex items-center gap-1">
                  {s.totalProducts}
                  <ShoppingCart />
                </div>
              </div>
              <div className="h-[12rem] overflow-auto whitespace-nowrap rounded bg-white p-4">
                {s.products.map((p, idx) => (
                  <p key={idx} className="mb-3 font-normal">
                    {p}
                  </p>
                ))}
              </div>
              <div className="inline-flex items-center gap-2">
                <CalendarDays />
                <span className="font-semibold">
                  {s.salesDate.toLocaleDateString("es-ES", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  })}
                  <span className="font-normal">&nbsp; a las &nbsp;</span>
                  {s.salesDate.toLocaleTimeString("es-ES", {
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true,
                  })}
                </span>
              </div>
              <div className="flex items-center justify-end gap-2">
                <p className="font-normal">{s.customerName}</p>
                {s.customerName ? <UserRound /> : <UserRoundX />}
              </div>
            </div>
          </SalesCard>
        ))}
      </div>
    </DynamicPanel>
  );
}
