import { useMutation, useQuery, useQueryClient } from "react-query";
import { useAuth } from "../../AuthContext";
import { callAuthenticatedApi, URL } from "../utils";

export const useGetUserCart = (userId) => {
  return useQuery(["carts", userId], async () => {
    const { data } = await callAuthenticatedApi(`${URL}/carts/${userId}`);
    return data;
  });
};

export const useDeleteBurgersInCart = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation(
    (payload) => {
      const { data } = callAuthenticatedApi(`${URL}/carts/burger/remove`, {
        method: "PUT",
        data: payload,
      });
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["carts", user.id]);
      },
    }
  );
};

export const useAddBurgerInCart = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  return useMutation(
    (payload) => {
      const { data } = callAuthenticatedApi(`${URL}/carts/burger`, {
        method: "POST",
        data: payload,
      });
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["carts", user.id]);
      },
    }
  );
};

export const useDeleteCart = () => {
  return useMutation((userId) => {
    const { data } = callAuthenticatedApi(`${URL}/carts/${userId}`, {
      method: "DELETE",
    });
    return data;
  });
};
