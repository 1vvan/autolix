import {ICar} from "@/shared/types/api-types";
import { api } from "./api";

export const carsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAvailableCars: builder.query<ICar[], string>({
      query: () => ({ url: "/available-autos" }),
    }),
    getOneCar: builder.query<ICar, number | string | undefined>({
      query: (carId) => ({ url: `/one-auto/${carId}` }),
    })
  }),
});

export const {
  useGetAvailableCarsQuery,
  useGetOneCarQuery
} = carsApi;
