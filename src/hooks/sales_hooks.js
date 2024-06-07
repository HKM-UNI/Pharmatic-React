import useSWR from "swr";

/**
 * @typedef SalesHistory
 * @property {string} customerName
 * @property {number} invoiceNo
 * @property {string[]} products
 * @property {string} salesAmount
 * @property {Date} salesDate
 * @property {number} totalProducts
 */

/**
 * @returns {[Array<SalesHistory>, boolean, Error | null | undefined, customerListUpdateTrigger]}
 */
export function useSalesHistory() {
  const { data, isLoading, error } = useSWR("sales/history");

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

  return [postProcess(data), isLoading, error];
}
