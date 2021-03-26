import { notification } from "antd";
import React, { useState } from "react";
import { useMutation } from "react-query";
import axios from "axios";
import jwtDecode from "jwt-decode";

const AuthContext = React.createContext({
  login: async () => {},
  logout: async () => {},
  user: {
    user: null,
    isLoggedIn: false,
    isAdmin: false,
    isUser: false,
  },
});
export const JWT_LOCALSTORAGE_KEY = "jwt";
export const CURRENT_USER = "user";
export const IS_ADMIN = "isAdmin";

export const AuthProvider = (props) => {
  const [user, setUser] = useState({
    user: null,
    isLoggedIn: false,
    isAdmin: false,
  });

  const { mutateAsync } = useMutation((params) =>
    axios.post("http://localhost:7000/users/login", params)
  );

  const login = async (payload) => {
    try {
      const response = await mutateAsync(payload);

      localStorage.setItem(JWT_LOCALSTORAGE_KEY, response.data.access_token);
      localStorage.setItem(CURRENT_USER, response.data.id);
      localStorage.setItem(IS_ADMIN, response.data.role === "ADMIN");

      // TODO

      // const jwt = jwtDecode(response.data.access_token);

      // console.log(jwt);

      // setUser({
      //   user: {
      //     username: response.data.username,
      //     role: response.data.role,
      //   },
      //   isLoggedIn: true,
      //   isAdmin: response.data.role !== "admin",
      // });
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
    localStorage.removeItem(CURRENT_USER);
    localStorage.removeItem(IS_ADMIN);

    // setUser({
    //   user: null,
    //   isLoggedIn: false,
    //   isAdmin: false,
    // });
  };

  return <AuthContext.Provider value={{ user, login, logout }} {...props} />;
};
export const useAuth = () => React.useContext(AuthContext);
