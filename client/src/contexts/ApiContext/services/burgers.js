import { useMutation, useQuery, useQueryClient } from "react-query";
import { callAuthenticatedApi, URL } from "../utils";

export const useGetBurgers = () => {
  return useQuery("burgers", async () => {
    const { data } = await callAuthenticatedApi(`${URL}/burgers`);
    return data;
  });
};

export const usePostBurger = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (payload) => {
      const { data } = callAuthenticatedApi(`${URL}/burgers`, {
        method: "POST",
        headers:'multipart/form-data',
        data: payload,
      });
      return data;
    },
    {
      onSettled: () => {
        queryClient.invalidateQueries("burgers");
      },
    }
  );
};

export const usePutBurger = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (payload) => {
      const { data } = callAuthenticatedApi(`${URL}/burgers/${payload.id}`, {
        method: "PUT",
        data: payload.values,
      });
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("burgers");
      },
    }
  );
};

export const useRemoveBurger = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (id) => {
      const { data } = callAuthenticatedApi(`${URL}/burgers/${id}`, {
        method: "DELETE",
      });
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("burgers");
      },
    }
  );
};
