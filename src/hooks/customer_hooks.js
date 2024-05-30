import { Customer } from "@/data/customer";
import axios from "axios";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

/**
 * Updates the customers list via API
 * @callback customerListUpdateTrigger
 * @param {Array<Customer>} data
 */

/**
 * @returns {[Array<Customer>, customerListUpdateTrigger, any, boolean]}
 */
export function useCustomers() {
  const { data, mutate, error, isLoading } = useSWR("customers");

  return [data, mutate, error, isLoading];
}

/**
 * Creates a customer via API
 * @async
 * @callback customerCreateTrigger
 * @param {Customer} data
 * @returns {Promise}
 */

/**
 * @returns {[customerCreateTrigger, Customer, any, boolean]}
 */
export function useCreateCustomer() {
  const createCustomer = async (url, { arg: data }) =>
    axios.post(url, data).then((resp) => resp.data);

  const {
    trigger,
    data: newData,
    error,
    isMutating,
  } = useSWRMutation("customers/create", createCustomer);

  return [trigger, newData, error, isMutating];
}

/**
 * @returns {[customerCreateTrigger, Customer, any, boolean]}
 */
export function useUpdateCustomer() {
  const updateCustomer = async (url, { arg: data }) =>
    axios
      .patch(url.replace("update_id", data.customerNo), data)
      .then((resp) => resp.data);

  const {
    trigger,
    data: newData,
    error,
    isMutating,
  } = useSWRMutation(`customers/update_id`, updateCustomer);

  return [trigger, newData, error, isMutating];
}

/**
 * Deletes a customer via API
 * @async
 * @callback customerDeleteTrigger
 * @param {number} id
 * @returns {Promise}
 */

/**
 * @returns {[customerDeleteTrigger, any, boolean]}
 */
export function useDeleteCustomer() {
  const updateCustomer = async (url, { arg: id }) =>
    axios.delete(url.replace("delete_id", id));

  const { trigger, error, isMutating } = useSWRMutation(
    `customers/delete_id`,
    updateCustomer
  );

  return [trigger, error, isMutating];
}
