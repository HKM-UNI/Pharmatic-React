import useSWR from "swr";

/**
 * @param {number} id
 * @returns {[Subcategory, Error]}
 */
export function useSubcategoryData(id) {
  const { data, error } = useSWR(id ? `subcategories/${id}` : null);

  return [data, error];
}

/**
 * @callback subcategoryListUpdateTrigger
 * @param {Array<Subcategory>} data
 */

/**
 * @returns {[Array<Subcategory>, boolean, Error | null | undefined, subcategoryListUpdateTrigger]}
 */
export function useSubcategories() {
  const { data, isLoading, error, mutate } = useSWR("subcategories");

  return [data, isLoading, error, mutate];
}
