import useSWR from "swr";
import { Customer } from "@/data/customer";

/**
 * @returns {[Array<Customer>, any, boolean]}
 */
export function useCustomers() {
  const { data, error, isLoading } = useSWR("customers");

  return [data, error, isLoading];
}
