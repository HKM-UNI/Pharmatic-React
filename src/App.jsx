import init_axios_defaults from "@/lib/axios_defaults";
import axios from "axios";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SWRConfig } from "swr";
import Login from "./pages/Login";
import MainLayout from "./shared/MainLayout";
import NotFound from "./pages/NotFound";
import Customers from "./pages/Customers";
import Providers from "./pages/Providers";
import CustomerForm from "./pages/forms/CustomerForm";
import ProviderForm from "./pages/forms/ProviderForm";

init_axios_defaults();

function App() {
  return (
    <SWRConfig
      value={{
        fetcher: (url) => axios.get(url).then((res) => res.data),
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route index path="/login" element={<Login />} />
          <Route path="/" element={<MainLayout />}>
            <Route index path="dashboard" element={<NotFound />} />
            <Route path="clientes" element={<Customers />} />
            <Route path="clientes/agregar" element={<CustomerForm />} />
            <Route
              path="clientes/editar/:customerId"
              element={<CustomerForm edit={true} />}
            />
            <Route path="proveedores" element={<Providers />} />
            <Route path="proveedores/agregar" element={<ProviderForm />} />
            <Route
              path="proveedores/editar/:providerId"
              element={<ProviderForm edit={true} />}
            />
            <Route path="productos" element={<NotFound />} />
            <Route path="metadata" element={<NotFound />} />
            <Route path="composiciones" element={<NotFound />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="*" element={<MainLayout />} />
        </Routes>
      </BrowserRouter>
    </SWRConfig>
  );
}

export default App;
