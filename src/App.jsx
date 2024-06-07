import { AuthProvider } from "@/auth";
import init_axios_defaults from "@/lib/axios_defaults";
import { AppRouter } from "@/router/AppRouter";
import axios from "axios";
import { SWRConfig } from "swr";

init_axios_defaults();

function App() {
  return (
    <SWRConfig
      value={{
        fetcher: (url) => axios.get(url).then((res) => res.data),
      }}
    >
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </SWRConfig>
  );
}

export default App;
