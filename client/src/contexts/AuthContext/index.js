import { notification } from "antd";
import { useNavigate } from "@reach/router";
import React, { useState } from "react";
import { useMutation } from "react-query";
import axios from "axios";
import jwtDecode from "jwt-decode";

const AuthContext = React.createContext({
  login: async () => {},
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

  const navigate = useNavigate();

  const { mutateAsync } = useMutation((params) =>
    axios.post("http://localhost:7000/users/login", params)
  );

  const login = async (payload) => {
    console.log("payload", payload);
    try {
      const response = await mutateAsync(payload);
      console.log("data", response);

      console.log("set user data", response.data);
      localStorage.setItem(JWT_LOCALSTORAGE_KEY, response.data.access_token);
      localStorage.setItem(CURRENT_USER, response.data.username);
      localStorage.setItem(IS_ADMIN, response.data.role === "Admin");

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

      await navigate("/burgers");
    } catch (e) {
      notification.open({
        message: e.message,
        description: "Échec de l'identification, veuillez réessayer.",
        type: "error",
      });
    }
  };

  return <AuthContext.Provider value={{ user, login }} {...props} />;
};
export const useAuth = () => React.useContext(AuthContext);
