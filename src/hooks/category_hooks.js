import useSWR from "swr";

/**
 * @param {number} id
 * @returns {[Category, Error]}
 */
export function useCategoryData(id) {
  const { data, error } = useSWR(id ? `categories/${id}` : null);

  return [data, error];
}

/**
 * @callback categoryListUpdateTrigger
 * @param {Array<Category>} data
 */

/**
 * @returns {[Array<Category>, boolean, Error | null | undefined, categoryListUpdateTrigger]}
 */
export function useCategories() {
  const { data, isLoading, error, mutate } = useSWR("categories");

  return [data, isLoading, error, mutate];
}
