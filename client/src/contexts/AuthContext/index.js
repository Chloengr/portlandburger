import { notification } from "antd";
import axios from "axios";
import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { URL } from "../ApiContext/utils";

const AuthContext = React.createContext({
  login: async () => {},
  logout: async () => {},

  user: {
    id: null,
    username: null,
    isAdmin: false,
    isLoggedIn: true,
  },
});
export const JWT_LOCALSTORAGE_KEY = "jwt";
export const AuthProvider = (props) => {
  const [user, setUser] = useState({
    id: null,
    username: null,
    isAdmin: false,
    isLoggedIn: true,
  });

  const { mutateAsync } = useMutation((params) =>
    axios.post(`${URL}/users/login`, params)
  );

  useEffect(() => {
    const token = localStorage.getItem(JWT_LOCALSTORAGE_KEY);

    // Verifier si c'est expiré

    if (token) {
      const jwt = jwtDecode(token);
      setUser({
        id: jwt.id,
        username: jwt.username,
        isAdmin: jwt.isAdmin,
        isLoggedIn: true,
      });
    }
  }, []);

  const login = async (payload) => {
    try {
      const response = await mutateAsync(payload);

      localStorage.setItem(JWT_LOCALSTORAGE_KEY, response.data.access_token);

      const jwt = jwtDecode(response.data.access_token);

      setUser({
        id: jwt.id,
        username: jwt.username,
        isAdmin: jwt.isAdmin,
        isLoggedIn: true,
      });
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

    setUser({
      id: null,
      username: null,
      isAdmin: false,
      isLoggedIn: true,
    });
  };

  return <AuthContext.Provider value={{ user, login, logout }} {...props} />;
};
export const useAuth = () => React.useContext(AuthContext);
