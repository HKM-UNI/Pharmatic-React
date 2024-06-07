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
 * @param {Array<Product>} data
 */

/**
 * @returns {[Array<Product>, boolean, Error | null | undefined, productListUpdateTrigger]}
 */
export function useProducts() {
  const { data, isLoading, error, mutate } = useSWR("products");

  return [data, isLoading, error, mutate];
}
