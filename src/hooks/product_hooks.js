import useSWR from "swr";

/**
 * @param {number} productNo
 * @returns {[Product, Error]}
 */
export function useProductData(productNo) {
  const { data, error } = useSWR(productNo ? `products/${productNo}` : null);

  return [data, error];
}

/**
 * Updates the product list via API
 * @callback productListUpdateTrigger
 * @param {Array<ProductOverview>} data
 */

/**
 * @returns {[Array<ProductOverview>, boolean, Error | null | undefined, productListUpdateTrigger]}
 */
export function useProducts() {
  const { data, isLoading, error, mutate } = useSWR("products/overview");

  return [data, isLoading, error, mutate];
}
