import { useQuery } from "react-query";
import { callAuthenticatedApi } from "../utils";

export const useGetBurgers = () => {
  return useQuery("burgers", async () => {
    const { data } = await callAuthenticatedApi(
      `http://localhost:7000/burgers`
    );
    return data;
  });
};
