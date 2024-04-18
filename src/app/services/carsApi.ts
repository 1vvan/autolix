import {IBuyCarRequest, ICar, IGetAllCarsRequest} from "@/shared/types/api-types";
import { api } from "./api";

export const carsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAvailableCars: builder.query<ICar[], string>({
      query: () => ({ url: "/autos/available" }),
    }),
    getOneCar: builder.query<ICar, number | string | undefined>({
      query: (carId) => ({ url: `/autos/${carId}` }),
    }),
    getAllCars: builder.query<ICar[], IGetAllCarsRequest>({
      query: (params: IGetAllCarsRequest) => ({
        url: `/autos-all`,
        params,
      }),
    }),
    buyCar: builder.mutation<void, IBuyCarRequest>({
      query: (buyCarRequest) => ({
        url: '/autos/buy',
        method: 'POST',
        body: buyCarRequest,
      }),
    }),
  }),
});

export const {
  useGetAvailableCarsQuery,
  useGetOneCarQuery,
  useGetAllCarsQuery,
  useBuyCarMutation
} = carsApi;
