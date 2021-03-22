import { useMutation } from "react-query";
import { callApi } from "../utils";

export const useMutationLogin = () => {
  return useMutation(async (payload) => {
    console.log(payload);
    const { data } = await callApi("http://localhost:7000/users/login", {
      method: "POST",
      data: payload,
    });
    return data;
  });
};
