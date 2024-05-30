import { default as axios } from "axios";

export default function init_axios_defaults() {
  axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
}
