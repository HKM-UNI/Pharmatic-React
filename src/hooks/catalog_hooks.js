import useSWR from "swr";

/**
 * @callback catalogListUpdateTrigger
 * @param {Array<Catalog>} data
 */

/**
 * @returns {[Array<Catalog>, boolean, Error | null | undefined, catalogListUpdateTrigger]}
 */
export function useCatalogs() {
  const { data, isLoading, error, mutate } = useSWR("product_catalog");

  return [data, isLoading, error, mutate];
}
