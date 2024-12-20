import { useToast } from "@/components/ui/use-toast";
import { refresh_auth_token } from "@/lib/axios_defaults";
import { jwtDecode } from "jwt-decode";
import { useEffect, useReducer } from "react";
import { authType } from "../types/types";
import { AuthContext, initialAuthState } from "./AuthContext";
import { useLogin } from "./authHooks";
import { authReducer } from "./authReducer";

/**
 * @typedef {import("./authReducer").loginState} loginState
 * @typedef {import("./authReducer").authUser} authUser
 */

/**
 * @typedef {
 *  {exp: number, username: string, email: string, imageUrl: string, scopes: string[]}
 * } jwtModel
 */

/**
 *
 * @returns {loginState}
 */
const authInitializer = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return {
    logged: !!user,
    user: user,
  };
};

export function AuthProvider({ children }) {
  const [loginRequest, isLoggingIn, authError, loginResponse] = useLogin();
  const [authState, dispatch] = useReducer(
    authReducer,
    initialAuthState,
    authInitializer,
  );
  const { toast } = useToast();

  useEffect(() => {
    if (authError) {
      const code = authError.response.status;
      /** @type {string} */
      var message = authError.response.data.message;
      var variant = "destructive";
      var title = "Error";

      if (code == 401) {
        if (message.includes("Password")) {
          message = "La contraseña es incorrecta.";
        } else {
          variant = "";
          message = "La sesión ha expirado";
          dispatch({ type: authType.logout });
        }
      } else if (code == 404) {
        message = "El usuario es incorrecto.";
      }

      toast({
        variant: variant,
        title: title,
        description: message,
      });
    }
  }, [authError]);

  useEffect(() => {
    if (!loginResponse) {
      return;
    }
    const { token } = loginResponse;
    refresh_auth_token(token);

    localStorage.setItem("session", token);

    /** @type {jwtModel} */
    const jwt = jwtDecode(token);

    /**
     * @type {authUser}
     */
    const loggedUser = {
      username: jwt.username,
      email: jwt.email,
      imageUrl: jwt.imageUrl,
      scopes: jwt.scopes,
    };
    localStorage.setItem("user", JSON.stringify(loggedUser));

    dispatch({
      type: authType.login,
      payload: loggedUser,
    });
  }, [loginResponse]);

  const logout = () => {
    localStorage.removeItem("session");
    localStorage.removeItem("user");
    dispatch({
      type: authType.logout,
    });
  };

  /**
   * @param {string[]} scope_list
   * @returns {boolean}
   */
  const checkScopes = (scope_list) => {
    const { scopes } = authState.user;
    if (!scopes) {
      return false;
    }

    return scope_list.every((s) => scopes.includes(s));
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        loggingIn: isLoggingIn,
        checkScopes: checkScopes,
        login: loginRequest,
        logout: logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
