import axios from "axios";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

/**
 * @param {number} id
 * @returns {[Provider, Error]}
 */
export function useProviderData(id) {
  const { data, error } = useSWR(id ? `providers/${id}` : null);

  return [data, error];
}

/**
 * Updates the providers list via API
 * @callback providerListUpdateTrigger
 * @param {Array<Customer>} data
 */

/**
 * @returns {[Array<Provider>, boolean, Error | null | undefined, providerListUpdateTrigger]}
 */
export function useProviders() {
  const { data, isLoading, error, mutate } = useSWR("providers");

  return [data, isLoading, error, mutate];
}

/**
 * Creates a provider via API
 * @async
 * @callback providerCreateTrigger
 * @param {Provider} data
 * @returns {Promise}
 */

/**
 * @returns {[providerCreateTrigger, boolean, Error | null | undefined]}
 */
export function useCreateProvider() {
  const createProvider = async (url, { arg: data }) =>
    axios.post(url, data).then((resp) => resp.data);

  const { trigger, isMutating, error } = useSWRMutation(
    "providers/create",
    createProvider,
  );

  return [trigger, isMutating, error];
}

/**
 * Updates a provider via API
 * @async
 * @callback providerUpdateTrigger
 * @param {Provider} data
 * @returns {Promise<any>}
 */
/**
 * @returns {[providerCreateTrigger, boolean, Error | null | undefined]}
 */
export function useUpdateProvider() {
  const updateProvider = async (url, { arg: data }) =>
    axios
      .patch(url.replace("update_id", data.providerNo), data)
      .then((resp) => resp.data);

  const { trigger, isMutating, error } = useSWRMutation(
    `providers/update_id`,
    updateProvider,
  );

  return [trigger, isMutating, error];
}

/**
 * Deletes a provider via API
 * @async
 * @callback providerDeleteTrigger
 * @param {number} id
 * @returns {Promise}
 */

/**
 * @returns {[providerDeleteTrigger, boolean, Error | null | undefined]}
 */
export function useDeleteProvider() {
  const deleteProvider = async (url, { arg: id }) =>
    axios.delete(url.replace("delete_id", id));

  const { trigger, isMutating, error } = useSWRMutation(
    `providers/delete_id`,
    deleteProvider,
  );

  return [trigger, isMutating, error];
}
