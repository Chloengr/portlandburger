/* eslint-disable no-throw-literal */
import { JWT_LOCALSTORAGE_KEY } from "../AuthContext/index";
import axios from "axios";

export const callApi = async (url, config) => {
  return await axios
    .request({
      method: "GET",
      url,
      ...config,
      headers: {
        accept: "application/json",
        ...config.headers,
      },
    })
    .catch((err) => {
      throw err?.response?.data?.violations?.map(
        ({ propertyPath, message }) => `${propertyPath} : ${message}`
      );
    });
};

export const callAuthenticatedApi = async (url, config) => {
  // const jwt = localStorage.getItem(JWT_LOCALSTORAGE_KEY)

  // if (!jwt) {
  //   return await callApi(url, config);
  // }
  return await callApi(url, {
    ...config,
    headers: {
      ...(config?.headers ?? {}),
      // Authorization: `Bearer ${jwt}`,
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1hcmllIiwiaWF0IjoxNjE2NDIyNzM0LCJleHAiOjE2MTY0MzM1MzR9.tr5yYEAisuz20q4tHlWBVoyEWAV9ni90Mgy5-L7qMEY`,
    },
  });
};
