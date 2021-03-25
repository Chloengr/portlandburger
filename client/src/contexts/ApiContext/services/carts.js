import { useQuery } from "react-query";
import { callAuthenticatedApi } from "../utils";

export const useGetUserPanier = (userId) => {
  return useQuery("paniers", async () => {
    const { data } = await callAuthenticatedApi(
      `http://localhost:7000/paniers/${userId}`
    );
    return data;
  });
};
