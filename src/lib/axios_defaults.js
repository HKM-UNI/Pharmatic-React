import { default as axios } from "axios";

export default function init_axios_defaults() {
  axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
  refresh_auth_token(localStorage.getItem("session"));
}

export function refresh_auth_token(token) {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
}
