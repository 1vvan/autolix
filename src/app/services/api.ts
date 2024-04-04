import { BASE_API_URL } from "@/shared/constants/api-url";
import { deleteLoginData, isTokenExpired } from "@/shared/helpers/authHelpers";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_API_URL,
    prepareHeaders: (headers, { getState, endpoint }) => {
      if (endpoint === 'fetchLogin' || endpoint === 'fetchRegister') {
        return headers;
      }

      if (isTokenExpired()) {
        deleteLoginData();
      } else {
        const accessToken = localStorage.getItem('token');
        if (accessToken) {
          headers.set('Authorization', `Bearer ${accessToken}`);
        }
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
  }),
});
