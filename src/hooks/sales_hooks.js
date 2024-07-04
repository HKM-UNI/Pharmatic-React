import axios from "axios";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
/**
 * @typedef SalesHistory
 * @property {string} customerName
 * @property {number} invoiceNo
 * @property {string[]} products
 * @property {string} salesAmount
 * @property {Date} salesDate
 * @property {number} totalProducts
 * @property {boolean} active
 */

/**
 * @returns {[Array<SalesHistory>, boolean, Error | null | undefined, customerListUpdateTrigger]}
 */
export function useSalesHistory() {
  const { data, isLoading, error, mutate } = useSWR("sales/history");

  const postProcess = (respData) => {
    if (!respData) {
      return [];
    }

    return respData.map((d) => ({
      ...d,
      salesDate: new Date(d.salesDate),
      salesAmount: `C$ ${(+d.salesAmount).toLocaleString()}`,
    }));
  };

  return [postProcess(data), isLoading, error, mutate];
}

export function useCreateInvoice() {
  const createInvoice = async (url, { arg: data }) =>
    axios.post(url, data).then((resp) => resp.data);

  const { trigger, isMutating, error } = useSWRMutation(
    "sales/create",
    createInvoice,
  );

  return [trigger, isMutating, error];
}

/**
 * Deletes a customer via API
 * @async
 * @callback salesDeleteTrigger
 * @param {number} sales_no
 * @returns {Promise}
 */

/**
 * @returns {[salesDeleteTrigger, boolean, Error | null | undefined]}
 */
export function useDeleteSales() {
  const deleteSales = async (url, { arg: sales_no }) =>
    axios.delete(url.replace("delete_id", sales_no));

  const { trigger, isMutating, error } = useSWRMutation(
    `sales/delete_id`,
    deleteSales,
  );

  return [trigger, isMutating, error];
}
