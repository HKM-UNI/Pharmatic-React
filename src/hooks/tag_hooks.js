import useSWR from "swr";

/**
 * @param {number} id
 * @returns {[Tag, Error]}
 */
export function useTagData(id) {
  const { data, error } = useSWR(id ? `tags/${id}` : null);

  return [data, error];
}

/**
 * @callback tagListUpdateTrigger
 * @param {Array<Tag>} data
 */

/**
 * @returns {[Array<Tag>, boolean, Error | null | undefined, tagListUpdateTrigger]}
 */
export function useTags() {
  const { data, isLoading, error, mutate } = useSWR("tags");

  return [data, isLoading, error, mutate];
}
