import { authType } from "../types/types";

/**
 * @typedef {Object} authUser
 * @property {string} username
 * @property {string[]} scopes
 */

/**
 * @typedef {Object} loginState
 * @property {boolean} logged
 * @property {boolean} loggingIn
 * @property {authUser=} user
 */

/**
 * @typedef {Object} actionPayload
 * @property {typeof authType} type
 * @property {authUser} payload
 */

/**
 * @param {loginState} state
 * @param {actionPayload} action
 * @returns {loginState}
 */
export const authReducer = (state = {}, action) => {
  switch (action.type) {
    case authType.login:
      return {
        ...state,
        logged: true,
        user: action.payload,
      };

    case authType.logout:
      return {
        ...state,
        logged: false,
        loggingIn: false,
      };

    default:
      throw Error(`${action.type} is not a valid Auth method`);
  }
};
