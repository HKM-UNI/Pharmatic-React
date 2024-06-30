import useSWR from "swr";

/**
 * @callback invoicingListUpdateTrigger
 * @param {Array<Invoicing>} data
 */

/**
 * @returns {[Array<Invoicing>, boolean, Error | null | undefined, invoicingListUpdateTrigger]}
 */
export function useInvoicings() {
  const { data, isLoading, error, mutate } = useSWR("stats/invoicing");

  return [data, isLoading, error, mutate];
}

/**
 * @callback invoicingListUpdateTrigger
 * @param {Array<Summary>} data
 */

/**
 * @returns {[Array<Summary>, boolean, Error | null | undefined, summaryListUpdateTrigger]}
 */
export function useSummaries() {
  const { data, isLoading, error, mutate } = useSWR("stats/summary");

  return [data, isLoading, error, mutate];
}
