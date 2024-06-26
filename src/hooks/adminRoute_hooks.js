import useSWR from "swr";

/**
 * @param {number} id
 * @returns {[AdministrationRoute, Error]}
 */
export function useAdminRouteData(id) {
  const { data, error } = useSWR(id ? `admin_routes/${id}` : null);

  return [data, error];
}

/**
 * @callback adminRouteListUpdateTrigger
 * @param {Array<AdministrationRoute>} data
 */

/**
 * @returns {[Array<AdministrationRoute>, boolean, Error | null | undefined, adminRouteListUpdateTrigger]}
 */
export function useAdminRoutes() {
  const { data, isLoading, error, mutate } = useSWR("admin_routes");

  return [data, isLoading, error, mutate];
}
