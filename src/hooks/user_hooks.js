import axios from "axios";
import { useEffect, useState } from "react";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

/**
 * @param {number} userId
 * @returns {[User, Error]}
 */
export function useUserData(userId) {
  const { data, error } = useSWR(userId ? `users/${userId}` : null);

  return [data, error];
}

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

/**
 * Creates a user via API
 * @async
 * @callback userCreateTrigger
 * @param {User} data
 * @returns {Promise}
 */

/**
 * @returns {[userCreateTrigger, boolean, Error | null | undefined]}
 */
export function useCreateUser() {
  const createUser = async (url, { arg: data }) =>
    axios.post(url, data).then((resp) => resp.data);

  const { trigger, isMutating, error } = useSWRMutation(
    "users/create",
    createUser,
  );

  return [trigger, isMutating, error];
}

/**
 * Updates a customer via API
 * @async
 * @callback userUpdateTrigger
 * @param {User} data
 * @returns {Promise<any>}
 */
/**
 * @returns {[userCreateTrigger, boolean, Error | null | undefined]}
 */
export function useUpdateUser() {
  const updateUser = async (url, { arg: data }) =>
    axios
      .patch(url.replace("update_id", data.username), data)
      .then((resp) => resp.data);

  const { trigger, isMutating, error } = useSWRMutation(
    `users/update_id`,
    updateUser,
  );

  return [trigger, isMutating, error];
}

/**
 * Updates a customer via API
 * @async
 * @callback userUpdatePermTrigger
 * @param {{username: string, permissions: any}} data
 * @returns {Promise<any>}
 */
/**
 * @returns {[userUpdatePermTrigger, boolean, Error | null | undefined]}
 */
export function useUpdateUserPermissions() {
  const updateUser = async (url, { arg: { username, permissions } }) =>
    axios
      .patch(url.replace("update_id", username), permissions)
      .then((resp) => resp.data);

  const { trigger, isMutating, error } = useSWRMutation(
    `users/update_id/permissions`,
    updateUser,
  );

  return [trigger, isMutating, error];
}

/**
 * Updates a user image via API
 * @async
 * @callback userUpdateImageTrigger
 * @param {{username: number, image: File}} data
 * @returns {Promise<any>}
 */

/**
 * @returns {[userUpdateImageTrigger, boolean, Error | null | undefined]}
 */

export function useUpdateUserImage() {
  const updateUserImage = async (url, { arg: { username, image } }) => {
    const formData = new FormData();
    formData.append("image", image);

    return axios
      .put(url.replace("update_id", username), formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => resp.data);
  };

  const { trigger, isMutating, error } = useSWRMutation(
    `users/update_id/image`,
    updateUserImage,
  );

  return [trigger, isMutating, error];
}

/** @typedef {import("./product_hooks").ComboBoxOption} ComboBoxOption */

/** @typedef {{roles: ComboBoxOption[]}} InitialUserFormOptions */

/** @type {InitialUserFormOptions} */
const initialFormOptionsState = {
  roles: [],
};

/* Este hook se usa para transformar los objetos de seleccion multiple del usuario
    a datos que pueda usar el LazyFormComboBox
 */
/** @param {User} userData  */
export function useInitialFormOptions(userData) {
  const [state, setState] = useState(initialFormOptionsState);

  useEffect(() => {
    if (userData) {
      const { role: r } = userData;

      setState({
        roles: r ? [{ value: r.id, label: r.roleName }] : [],
      });
    }
  }, [userData]);

  return state;
}

/**
 * Deletes a user via API
 * @async
 * @callback userDeleteTrigger
 * @param {string} username
 * @returns {Promise}
 */

/**
 * @returns {[userDeleteTrigger, boolean, Error | null | undefined]}
 */
export function useDeleteUser() {
  const deleteUser = async (url, { arg: username }) =>
    axios.delete(url.replace("delete_id", username));

  const { trigger, isMutating, error } = useSWRMutation(
    `users/delete_id`,
    deleteUser,
  );

  return [trigger, isMutating, error];
}
