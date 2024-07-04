import { useDeleteSales, useSalesHistory } from "@/hooks/sales_hooks";
import DynamicPanel from "@/shared/DynamicPanel";
import {
  Banknote,
  CalendarDays,
  ShoppingCart,
  Trash,
  UserRound,
  UserRoundX,
} from "lucide-react";
import Error from "./Error";
import LoadingPanel from "./LoadingPanel";
import { Button } from "@/components/ui/button";
import { useContext } from "react";
import { AuthContext } from "@/auth";

function SalesCard({ children, active = true }) {
  return (
    <div
      className={`2xl:text-md hover:scale-102 flex flex-col rounded-lg bg-gray-100 p-5 text-sm shadow-md transition delay-150 ease-in-out hover:-translate-y-1 hover:drop-shadow-md ${!active && "bg-red-100"}`}
    >
      {children}
    </div>
  );
}

export default function SalesHistory() {
  const { checkScopes } = useContext(AuthContext);

  const hasDeletePermissions = checkScopes(["sales:delete"]);

  const [sales, isLoading, error, updateSales] = useSalesHistory();
  const [deleteSales] = useDeleteSales();

  if (error) {
    return <Error message="No se pudieron cargar las ventas." />;
  }

  if (isLoading) {
    return <LoadingPanel />;
  }

  const handleRemoval = async (sales_id) => {
    await deleteSales(sales_id);
    updateSales();
  };

  return (
    <DynamicPanel>
      <div className="grid h-full grid-cols-1 gap-6 p-6 md:grid-cols-2 2xl:grid-cols-3">
        {sales.map((s) => (
          <SalesCard key={s.invoiceNo} active={s.active}>
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
              <div className="flex items-center justify-between gap-2">
                {!hasDeletePermissions ? null : (
                  <Button
                    size="icon"
                    className="rounded-full border-transparent bg-transparent hover:bg-white"
                    variant="outline"
                    onClick={() => handleRemoval(s.invoiceNo)}
                  >
                    <Trash className="h-3 w-3 md:h-5 md:w-5" color="red" />
                  </Button>
                )}
                <div className="flex items-center gap-2">
                  <p className="font-normal">{s.customerName}</p>
                  {s.customerName ? <UserRound /> : <UserRoundX />}
                </div>
              </div>
            </div>
          </SalesCard>
        ))}
      </div>
    </DynamicPanel>
  );
}
