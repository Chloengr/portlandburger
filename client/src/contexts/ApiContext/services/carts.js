import { useMutation, useQuery, useQueryClient } from "react-query";
import { useAuth } from "../../AuthContext";
import { callAuthenticatedApi, URL } from "../utils";

export const useGetUserPanier = (userId) => {
  return useQuery(["paniers", userId], async () => {
    const { data } = await callAuthenticatedApi(`${URL}/paniers/${userId}`);
    return data;
  });
};

export const useDeleteBurgersInCart = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation(
    (payload) => {
      const { data } = callAuthenticatedApi(`${URL}/paniers/burger/remove`, {
        method: "PUT",
        data: payload,
      });
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["paniers", user.id]);
      },
    }
  );
};

export const useAddBurgerInCart = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  return useMutation(
    (payload) => {
      const { data } = callAuthenticatedApi(`${URL}/paniers/burger`, {
        method: "POST",
        data: payload,
      });
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["paniers", user.id]);
      },
    }
  );
};

export const useDeleteCart = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (userId) => {
      const { data } = callAuthenticatedApi(`${URL}/paniers/${userId}`, {
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
