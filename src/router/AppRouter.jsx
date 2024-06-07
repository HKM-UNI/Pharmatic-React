import Customers from "@/pages/Customers";
import Login from "@/pages/Login";
import NotFound from "@/pages/NotFound";
import Providers from "@/pages/Providers";
import SalesHistory from "@/pages/SalesHistory";
import CustomerForm from "@/pages/forms/CustomerForm";
import ProviderForm from "@/pages/forms/ProviderForm";
import MainLayout from "@/shared/MainLayout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import Products from "@/pages/Products";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          index
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <MainLayout />
            </PrivateRoute>
          }
        >
          {MainContentRoutes()}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const MainContentRoutes = () => (
  <>
    <Route index path="dashboard" element={<NotFound />} />
    {SalesRoutes()}
    {CustomerRoutes()}
    {ProviderRoutes()}
    {ProductRoutes()}
    <Route path="metadata" element={<NotFound />} />
    <Route path="composiciones" element={<NotFound />} />
    <Route path="*" element={<NotFound />} />
  </>
);

const SalesRoutes = () => (
  <>
    <Route path="ventas/carrito" element={<NotFound />} />
    <Route path="ventas/reciente" element={<SalesHistory />} />
  </>
);

const CustomerRoutes = () => (
  <>
    <Route path="clientes" element={<Customers />} />
    <Route path="clientes/agregar" element={<CustomerForm />} />
    <Route
      path="clientes/editar/:customerId"
      element={<CustomerForm edit={true} />}
    />
  </>
);

const ProviderRoutes = () => (
  <>
    <Route path="proveedores" element={<Providers />} />
    <Route path="proveedores/agregar" element={<ProviderForm />} />
    <Route
      path="proveedores/editar/:providerId"
      element={<ProviderForm edit={true} />}
    />
  </>
);

const ProductRoutes = () => <Route path="productos" element={<Products />} />;
