import {IAllCarsModels, IBuyCarRequest, ICar, IGetAllCarsRequest} from "@/shared/types/api-types";
import { api } from "./api";

export const carsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAvailableCars: builder.query<ICar[], IGetAllCarsRequest>({
      query: (params: IGetAllCarsRequest) => ({
        url: `/autos-available`,
        params,
      }),
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
    getCarsModels: builder.query<IAllCarsModels, void>({
      query: () => ({ url: `/autos-models` }),
    }),
  }),
});

export const {
  useGetAvailableCarsQuery,
  useGetOneCarQuery,
  useGetAllCarsQuery,
  useGetCarsModelsQuery,
  useBuyCarMutation,
} = carsApi;
