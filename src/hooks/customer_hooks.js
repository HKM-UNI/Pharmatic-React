import axios from "axios";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

/**
 * @param {number} id
 * @returns {[Customer, Error]}
 */
export function useCustomerData(id) {
  const { data, error } = useSWR(id ? `customers/${id}` : null);

  return [data, error];
}

/**
 * Updates the customers list via API
 * @callback customerListUpdateTrigger
 * @param {Array<Customer>} data
 */

/**
 * @returns {[Array<Customer>, boolean, Error | null | undefined, customerListUpdateTrigger]}
 */
export function useCustomers() {
  const { data, isLoading, error, mutate } = useSWR("customers");

  return [data, isLoading, error, mutate];
}

/**
 * Creates a customer via API
 * @async
 * @callback customerCreateTrigger
 * @param {Customer} data
 * @returns {Promise}
 */

/**
 * @returns {[customerCreateTrigger, boolean, Error | null | undefined]}
 */
export function useCreateCustomer() {
  const createCustomer = async (url, { arg: data }) =>
    axios.post(url, data).then((resp) => resp.data);

  const { trigger, isMutating, error } = useSWRMutation(
    "customers/create",
    createCustomer,
  );

  return [trigger, isMutating, error];
}

/**
 * Updates a customer via API
 * @async
 * @callback customerUpdateTrigger
 * @param {Customer} data
 * @returns {Promise<any>}
 */
/**
 * @returns {[customerCreateTrigger, boolean, Error | null | undefined]}
 */
export function useUpdateCustomer() {
  const updateCustomer = async (url, { arg: data }) =>
    axios
      .patch(url.replace("update_id", data.customerNo), data)
      .then((resp) => resp.data);

  const { trigger, isMutating, error } = useSWRMutation(
    `customers/update_id`,
    updateCustomer,
  );

  return [trigger, isMutating, error];
}

/**
 * Deletes a customer via API
 * @async
 * @callback customerDeleteTrigger
 * @param {number} id
 * @returns {Promise}
 */

/**
 * @returns {[customerDeleteTrigger, boolean, Error | null | undefined]}
 */
export function useDeleteCustomer() {
  const deleteCustomer = async (url, { arg: id }) =>
    axios.delete(url.replace("delete_id", id));

  const { trigger, isMutating, error } = useSWRMutation(
    `customers/delete_id`,
    deleteCustomer,
  );

  return [trigger, isMutating, error];
}
