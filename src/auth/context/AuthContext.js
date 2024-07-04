import { createContext } from "react";

/**
 * @async
 * @callback loginRequest
 * @param {{username: string, password: string}} data
 * @returns {Promise}
 */

/**
 * @callback logoutRequest
 */

/**
 * @callback CheckScopesCallback
 * @param {string[]} scope_list
 * @returns {boolean}
 */

/**
 * @typedef authFunctions
 * @property {loginRequest} login
 * @property {logoutRequest} logout
 * @property {CheckScopesCallback} checkScopes
 */

/**
 * @type {import("./authReducer").loginState & authFunctions}
 */
export const initialAuthState = {
  logged: false,
  loggingIn: false,
  user: null,
  checkScopes: (_) => {},
  login: (data = {}) => {},
  logout: () => {},
};

export const AuthContext = createContext(initialAuthState);
