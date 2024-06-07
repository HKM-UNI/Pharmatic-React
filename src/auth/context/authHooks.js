import axios from "axios";
import useSWRMutation from "swr/mutation";

/**
 * @typedef {import("./AuthContext").loginRequest} loginRequest
 */

/**
 * @typedef {{token: string}} loginResponse
 */
/**
 * @returns {[loginRequest, boolean, Error | null | undefined, loginResponse]}
 */
export function useLogin() {
  const login = async (url, { arg: data }) =>
    axios.post(url, data).then((resp) => resp.data);

  const { trigger, isMutating, error, data } = useSWRMutation(
    "users/login",
    login,
  );

  return [trigger, isMutating, error, data];
}
