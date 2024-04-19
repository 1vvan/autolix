import {IBrands, IBuyCarRequest, ICar, IGetAllCarsRequest, IModels} from "@/shared/types/api-types";
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
    getBrands: builder.query<IBrands, void>({
      query: () => ({ url: `/autos/brands` }),
    }),
    getModels: builder.query<IModels, void>({
      query: () => ({ url: `/autos/models` }),
    }),
  }),
});

export const {
  useGetAvailableCarsQuery,
  useGetOneCarQuery,
  useGetAllCarsQuery,
  useGetBrandsQuery,
  useGetModelsQuery,
  useBuyCarMutation,
} = carsApi;
