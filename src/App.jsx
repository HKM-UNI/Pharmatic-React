import init_axios_defaults from "@/lib/axios_defaults";
import axios from "axios";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SWRConfig } from "swr";
import Login from "./pages/Login";
import MainLayout from "./shared/MainLayout";

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
          <Route path="/" element={<Login />} />
          <Route path="*" element={<MainLayout />} />
        </Routes>
      </BrowserRouter>
    </SWRConfig>
  );
}

export default App;
