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
import Metadata from "@/pages/Metadata";
import ProductForm from "@/pages/forms/ProductForm";
import Dashboard from "@/pages/Dashboard";

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
    <Route index path="dashboard" element={<Dashboard />} />
    {SalesRoutes()}
    {CustomerRoutes()}
    {ProviderRoutes()}
    {ProductRoutes()}
    {MetaDataRoutes()}
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

const MetaDataRoutes = () => (
  <>
    <Route path="metadata" element={<Metadata />} />
    <Route path="metadata/categorias" element={<NotFound />} />
    <Route path="metadata/unidades" element={<NotFound />} />
    <Route path="metadata/tags" element={<NotFound />} />
    <Route path="metadata/vias" element={<NotFound />} />
    <Route path="metadata/tipo" element={<NotFound />} />
  </>
);

const ProductRoutes = () => (
  <>
    <Route path="productos" element={<Products />} />{" "}
    <Route path="productos/agregar" element={<ProductForm />} />
  </>
);
