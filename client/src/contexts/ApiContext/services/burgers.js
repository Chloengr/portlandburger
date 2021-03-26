import { useMutation, useQuery } from "react-query";
import { callAuthenticatedApi } from "../utils";

export const useGetBurgers = () => {
  return useQuery("burgers", async () => {
    const { data } = await callAuthenticatedApi(
      `http://localhost:7000/burgers`
    );
    return data;
  });
};

export const usePostBurgers = () => {
  return useMutation(
    (payload) => {
      const { data } = callAuthenticatedApi(`http://localhost:7000/burgers`, {
        method: "POST",
        data: payload,
      });
      return data;
    },
    {
      throwOnError: true,
    }
  );
};

export const useRemoveBurger = () => {
  return useMutation(
    (id) => {
      const { data } = callAuthenticatedApi(
        `http://localhost:7000/burgers/${id}`,
        {
          method: "DELETE",
        }
      );
      return data;
    },
    {
      throwOnError: true,
    }
  );
};
