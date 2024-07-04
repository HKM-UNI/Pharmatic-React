import axios from "axios";
import { useEffect, useState } from "react";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

/**
 * @param {number} productNo
 * @returns {[Product, Error]}
 */
export function useProductData(productNo) {
  const { data, isLoading, error, mutate } = useSWR(
    productNo ? `products/${productNo}` : null,
  );

  return [data, isLoading, error, mutate];
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
 * @param {{productNo: number, image: File}} data
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

/** @typedef {import("@/components/custom_form/LazyFormComboBox").ComboBoxOption} ComboBoxOption */
/** @typedef {import("@/data/product").Product} Product */

/**
 * @typedef InitialProductFormOptions
 * @property {ComboBoxOption[]} catalogs
 * @property {ComboBoxOption[]} categories
 * @property {ComboBoxOption[]} subcategories
 * @property {ComboBoxOption[]} dosageForms
 * @property {ComboBoxOption[]} adminRoutes
 * @property {ComboBoxOption[]} providers
 * @property {ComboBoxOption[]} tags
 */

/**
 * @param {Product} productData
 * @returns {InitialProductFormOptions}
 */

/** @type {InitialProductFormOptions} */
const initialFormOptionsState = {
  catalogs: [],
  categories: [],
  subcategories: [],
  dosageForms: [],
  adminRoutes: [],
  providers: [],
  tags: [],
};

/* Este hook se usa para transformar los objetos de seleccion multiple del producto
    a datos que pueda usar el LazyFormComboBox
 */
export function useInitialFormOptions(productData) {
  const [state, setState] = useState(initialFormOptionsState);

  useEffect(() => {
    if (productData) {
      const {
        catalog: c,
        category: cat,
        subcategory: sc,
        dosageForm: df,
        adminRoute: ar,
        provider: p,
        tags: t,
      } = productData;

      // Algunas propiedades del producto son nullables
      // Por lo que es necesario usar el ternatio para asignar un arreglo vacío
      //  cuando sea necesario.
      setState({
        catalogs: [{ value: c.catalogNo, label: c.name }],
        categories: cat ? [{ value: cat.categoryNo, label: cat.name }] : [],
        subcategories: sc ? [{ value: sc.subcategoryNo, label: sc.name }] : [],
        dosageForms: df ? [{ value: df.dosageFormNo, label: df.name }] : [],
        adminRoutes: ar
          ? [{ value: ar.adminRouteNo, label: ar.description }]
          : [],
        providers: p ? [{ value: p.providerNo, label: p.name }] : [],
        tags: t.map((i) => ({ value: i.tagNo, label: i.name })),
      });
    }
  }, [productData]);

  return state;
}

/**
 * Deletes a customer via API
 * @async
 * @callback productDeleteTrigger
 * @param {number} id
 * @returns {Promise}
 */

/**
 * @returns {[productDeleteTrigger, boolean, Error | null | undefined]}
 */
export function useDeleteProduct() {
  const deleteCustomer = async (url, { arg: id }) =>
    axios.delete(url.replace("delete_id", id));

  const { trigger, isMutating, error } = useSWRMutation(
    `products/delete_id`,
    deleteCustomer,
  );

  return [trigger, isMutating, error];
}
