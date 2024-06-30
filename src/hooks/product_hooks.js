import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import axios from "axios";

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

/**
 * Creates a product via API
 * @async
 * @callback productCreateTrigger
 * @param {Product} data
 * @returns {Promise}
 */

/**
 * @returns {[productCreateTrigger, boolean, Error | null | undefined]}
 */
export function useCreateProduct() {
  const createProduct = async (url, { arg: data }) =>
    axios.post(url, data).then((resp) => resp.data);

  const { trigger, isMutating, error } = useSWRMutation(
    "products/create",
    createProduct,
  );

  return [trigger, isMutating, error];
}

/**
 * Updates a customer via API
 * @async
 * @callback productUpdateTrigger
 * @param {Product} data
 * @returns {Promise<any>}
 */
/**
 * @returns {[productCreateTrigger, boolean, Error | null | undefined]}
 */
export function useUpdateProduct() {
  const updateProduct = async (url, { arg: data }) =>
    axios
      .patch(url.replace("update_id", data.productNo), data)
      .then((resp) => resp.data);

  const { trigger, isMutating, error } = useSWRMutation(
    `products/update_id`,
    updateProduct,
  );

  return [trigger, isMutating, error];
}

/**
 * Updates a product image via API
 * @async
 * @callback productUpdateImageTrigger
 * @param {string} productNo - The product number
 * @param {File} image - The image file
 * @returns {Promise<any>}
 */

/**
 * @returns {[productUpdateImageTrigger, boolean, Error | null | undefined]}
 */

export function useUpdateProductImage() {
  const updateProductImage = async (url, { arg: { productNo, image } }) => {
    const formData = new FormData();
    formData.append("image", image);

    return axios
      .put(url.replace("update_id", productNo), formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => resp.data);
  };

  const { trigger, isMutating, error } = useSWRMutation(
    `products/update_id/image`,
    updateProductImage,
  );

  return [trigger, isMutating, error];
}

/**
 * Updates the product list via API
 * @callback recentProductListUpdateTrigger
 * @param {Array<RecentProduct>} data
 */

/**
 * @returns {[Array<RecentProduct>, boolean, Error | null | undefined, recentProductListUpdateTrigger]}
 */
export function useRecentProducts() {
  const { data, isLoading, error, mutate } = useSWR("products/recent_updates");

  return [data, isLoading, error, mutate];
}

/**
 * Updates the product list via API
 * @callback productExpirationListUpdateTrigger
 * @param {Array<ProductExpiration>} data
 */

/**
 * @returns {[Array<ProductExpiration>, boolean, Error | null | undefined, productExpirationListUpdateTrigger]}
 */
export function useProductExpiration() {
  const { data, isLoading, error, mutate } = useSWR(
    "products/expiration_report",
  );

  return [data, isLoading, error, mutate];
}
