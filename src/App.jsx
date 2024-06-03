import init_axios_defaults from "@/lib/axios_defaults";
import axios from "axios";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SWRConfig } from "swr";
import Login from "./pages/Login";
import MainLayout from "./shared/MainLayout";
import NotFound from "./pages/NotFound";
import Customers from "./pages/Customers";
import Providers from "./pages/Providers";

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
            <Route path="proveedores" element={<Providers />} />
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
