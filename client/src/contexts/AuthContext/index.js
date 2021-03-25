import { useLocation, useNavigate } from "@reach/router";
import { notification } from "antd";
import jwtDecode from "jwt-decode";
import { parse } from "query-string";
import React, { useCallback, useState } from "react";
import { useMutationLogin } from "../ApiContext/services/auth";

const AuthContext = React.createContext({
  login: async () => {
    console.log("coucou");
  },

  logout: () => {
    // clear the token in localStorage and the user data
  },

  setUser: () => {
    // Set the user data & token
  },

  data: {
    user: null,
    isLoggedIn: false,
    isAdmin: false,
    isUser: false,
  },
});

export const JWT_LOCALSTORAGE_KEY = "jwt";
export const JWT_REFRESH_LOCALSTORAGE_KEY = "jwt_refresh";
export const IMPERSONATED_LOCALSTORAGE_KEY = "impersonated";

export const AuthProvider = (props) => {
  const [data, setData] = useState({
    user: null,
    isLoggedIn: false,
    isAdmin: false,
    isUser: false,
  });

  let token = "";

  const navigate = useNavigate();
  const location = useLocation();

  const mutateLogin = useMutationLogin();

  const searchParams = parse(location.search);

  console.log("searchParams.jwt", searchParams.jwt);

  if (searchParams.jwt) {
    token = searchParams.jwt;
    localStorage.setItem(JWT_LOCALSTORAGE_KEY, token);
  } else {
    token = localStorage.getItem(JWT_LOCALSTORAGE_KEY);
  }

  if (token && !data.isLoggedIn) {
    console.log(token);
    const jwt = jwtDecode(token);

    const now = Date.now() / 1000;
    if (jwt.exp > now) {
      setData({
        user: {
          id: jwt.id,
          username: jwt.username,
          roles: jwt.roles,
        },
        isLoggedIn: true,
        isAdmin: jwt.roles.includes("Admin"),
        isUser: jwt.roles.includes("User"),
      });
    }
  }

  const setUser = useCallback((token) => {
    localStorage.setItem(JWT_LOCALSTORAGE_KEY, token);
    const jwt = jwtDecode(token);

    setData({
      user: {
        id: jwt.id,
        username: jwt.username,
        roles: jwt.roles,
      },
      isLoggedIn: true,
      isAdmin: jwt.roles.includes("Admin"),
      isUser: jwt.roles.includes("User"),
    });
  }, []);

  const login = async (payload, { redirectTo }) => {
    console.log("coucou");
    try {
      const { token } = await mutateLogin(payload);

      console.log("token", token);

      setUser(token);

      if (redirectTo) {
        await navigate(redirectTo);
      }
    } catch (e) {
      notification.open({
        message: e.message,
        description: "Échec de l'identification, veuillez réessayer.",
        type: "error",
      });
    }
  };

  const logout = () => {
    localStorage.removeItem(JWT_LOCALSTORAGE_KEY);
    localStorage.removeItem(JWT_REFRESH_LOCALSTORAGE_KEY);
    setData({
      user: null,
      isLoggedIn: false,
      isAdmin: false,
      isUser: false,
      isImpersonated: false,
    });
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ data, setUser, login, logout }} {...props} />
  );
};
export const useAuth = () => React.useContext(AuthContext);
