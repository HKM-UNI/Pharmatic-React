import useSWR from "swr";
import { Provider } from "@/data/provider";

/**
 * @returns {[Array<Provider>, any, boolean]}
 */
export function useProviders() {
  const { data, error, isLoading } = useSWR("providers");

  return [data, error, isLoading];
}
