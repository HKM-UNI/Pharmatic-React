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
 * @typedef authFunctions
 * @property {loginRequest} login
 * @property {logoutRequest} logout
 */

/**
 * @type {import("./authReducer").loginState & authFunctions}
 */
export const initialAuthState = {
  logged: false,
  loggingIn: false,
  user: null,
  login: (data = {}) => {},
  logout: () => {},
};

export const AuthContext = createContext(initialAuthState);
