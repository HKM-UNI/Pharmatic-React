import { useInvoicings, useSummaries } from "@/hooks/statistics_hooks";
import React from "react";
import Error from "./Error";
import LoadingPanel from "./LoadingPanel";
import {
  BaggageClaim,
  Landmark,
  UserRound,
  UsersRound,
  Wallet,
  Warehouse,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useProductExpiration, useRecentProducts } from "@/hooks/product_hooks";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Dashboard() {
  const [summaries, summaryIsLoading, summaryError, updateSummaryList] =
    useSummaries();

  const [invoicings, invoicingsIsLoading, invoicingError, updateInvoicingList] =
    useInvoicings();

  const [products, productIsLoading, productError, updateProductList] =
    useRecentProducts();

  const [
    productsExpirations,
    productExpirationIsLoading,
    productExpirationError,
    updateProductExpirationList,
  ] = useProductExpiration();

  const pharmaticPrimary = "gray";
  const iconSize = "h-5 w-5";

  if (
    summaryError ||
    invoicingError ||
    productError ||
    productExpirationError
  ) {
    return <Error message="Failed to fetch dashboard data." />;
  }

  if (
    summaryIsLoading ||
    invoicingsIsLoading ||
    productIsLoading ||
    productExpirationIsLoading
  ) {
    return <LoadingPanel />;
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const getBackgroundColor = (expirationDate) => {
    const today = new Date();
    const expiration = new Date(expirationDate);
    const differenceInDays = (expiration - today) / (1000 * 3600 * 24);

    if (differenceInDays <= 0) {
      return "bg-red-500";
    } else if (differenceInDays <= 30) {
      return "bg-yellow-500";
    }
    return "";
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatContainer
          title="Número de clientes"
          icon={<UserRound className={iconSize} color={pharmaticPrimary} />}
          information={`${summaries.customers}`}
        />

        <StatContainer
          title="Número de proveedores"
          icon={<UsersRound className={iconSize} color={pharmaticPrimary} />}
          information={`${summaries.providers}`}
        />

        <StatContainer
          title="Ventas de hoy"
          icon={<Wallet className={iconSize} color={pharmaticPrimary} />}
          information={`C$ ${summaries.salesAmountToday}`}
        />

        <StatContainer
          title="Ventas del mes"
          icon={<Landmark className={iconSize} color={pharmaticPrimary} />}
          information={`C$ ${summaries.salesAmountMonth}`}
        />
      </div>
      <div className="my-3 grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="flex items-center rounded-xl border-2 bg-white p-6 drop-shadow-2xl">
          <ChartContainer data={invoicings} />
        </div>

        <div className="grid grid-cols-1 rounded-xl border-2 bg-white px-6 py-4 drop-shadow-2xl">
          <h2 className="text-xl font-bold">
            Productos agregados recientemente
          </h2>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead></TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead>Precio venta</TableHead>
                <TableHead className="text-right">Stock</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((p) => (
                <TableRow key={p.productNo}>
                  <TableCell className="font-medium">
                    <img
                      src={p.imageUrl}
                      alt="card image"
                      className="h-6 w-6 object-contain"
                    />
                  </TableCell>
                  <TableCell>{p.productName}</TableCell>
                  <TableCell>{`C$ ${p.sellingPriceUnit}`}</TableCell>
                  <TableCell className="text-right">{p.stock}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="grid grid-cols-1 rounded-xl border-2 bg-white px-6 py-4 drop-shadow-2xl">
        <h2 className="text-xl font-bold">
          Productos Vencidos/Apuntos de vencer
        </h2>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Consigna</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Tipo dósis</TableHead>
              <TableHead>Fecha vencimiento</TableHead>
              <TableHead>Precio compra</TableHead>
              <TableHead className="text-right">Stock</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {productsExpirations.map((p) => (
              <TableRow key={p.productNo}>
                <TableCell className="font-medium">{`${p.consign} ${p.consign === "Si" ? "🛡️" : ""}`}</TableCell>
                <TableCell>{p.productName}</TableCell>
                <TableCell>{p.dosageForm}</TableCell>
                <TableCell className={getBackgroundColor(p.expirationDate)}>
                  {formatDate(p.expirationDate)}
                </TableCell>
                <TableCell>{`C$ ${p.purchasePriceUnit}`}</TableCell>
                <TableCell className="text-right">{p.stock}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}

function StatContainer({ title, icon, information, children }) {
  return (
    <div className="grid grid-cols-1 rounded-xl border-2 bg-white px-6 py-4 drop-shadow-2xl">
      <div className="flex justify-between">
        <h3 className="text-sm font-semibold">{title}</h3>
        {icon}
      </div>
      <div>
        <h2 className="text-2xl font-bold">{information}</h2>
        {children}
      </div>
    </div>
  );
}

function ChartContainer({ data }) {
  const formatMonth = (dateString) => {
    const date = new Date(dateString);
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear();
    return `${month} ${year}`;
  };

  const formattedData = data.map((invoicing) => ({
    month: formatMonth(invoicing.monthCut),
    purchaseAmount: invoicing.purchaseAmount,
    salesAmount: invoicing.salesAmount,
  }));

  return (
    <ResponsiveContainer width={"100%"} height={300}>
      <BarChart data={formattedData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="purchaseAmount" fill="darkblue" name="Compras" />
        <Bar
          dataKey="salesAmount"
          fill="hsla(186, 78%, 42%, 1)"
          name="Ventas"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
