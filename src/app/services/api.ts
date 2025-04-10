import { BASE_API_URL } from "@/shared/constants/api-url";
import { logout, isTokenExpired, openEndpoints } from "@/shared/helpers/authHelpers";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  tagTypes: ['CarsModels', 'OneCar', 'Cars', 'BookingServices'],
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_API_URL,
    prepareHeaders: (headers, { getState, endpoint }) => {
      if (openEndpoints.includes(endpoint)) {
        return headers;
      }

      if (isTokenExpired()) {
        logout();
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
