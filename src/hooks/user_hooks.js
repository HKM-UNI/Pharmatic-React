import useSWR from "swr";

/**
 * @callback userListUpdateTrigger
 * @param {Array<User>} data
 */

/**
 * @returns {[Array<User>, boolean, Error | null | undefined, userListUpdateTrigger]}
 */
export function useUsers() {
  const { data, isLoading, error, mutate } = useSWR("users");

  return [data, isLoading, error, mutate];
}
