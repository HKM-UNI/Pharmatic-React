import useSWR from "swr";

/**
 * @param {number} id
 * @returns {[DosageForm, Error]}
 */
export function useDosageFormData(id) {
  const { data, error } = useSWR(id ? `dosage_forms/${id}` : null);

  return [data, error];
}

/**
 * @callback dosageFormListUpdateTrigger
 * @param {Array<DosageForm>} data
 */

/**
 * @returns {[Array<DosageForm>, boolean, Error | null | undefined, dosageFormListUpdateTrigger]}
 */
export function useDosageForms() {
  const { data, isLoading, error, mutate } = useSWR("dosage_forms");

  return [data, isLoading, error, mutate];
}
