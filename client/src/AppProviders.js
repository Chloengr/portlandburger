import { LocationProvider } from "@reach/router";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ApiProvider } from "../src/contexts/ApiContext";
import { AuthProvider } from "../src/contexts/AuthContext";

const queryClient = new QueryClient();

const AppProviders = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <LocationProvider>
        <ApiProvider>
          <AuthProvider>{children}</AuthProvider>
        </ApiProvider>
      </LocationProvider>
    </QueryClientProvider>
  );
};
export default AppProviders;
