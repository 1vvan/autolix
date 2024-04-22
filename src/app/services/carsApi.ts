import { IBuyCarRequest, ICar, ICarUpdateRequest, IGetAllCarsRequest} from "@/shared/types/api-types";
import { api } from "./api";

export const carsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAvailableCars: builder.query<ICar[], IGetAllCarsRequest>({
      query: (params: IGetAllCarsRequest) => ({
        url: `/autos-available`,
        params,
      }),
      providesTags: result => ['Cars']
    }),
    getOneCar: builder.query<ICar, number | string | undefined>({
      query: (carId) => ({ url: `/autos/${carId}` }),
      providesTags: result => ['OneCar', 'Cars']
    }),
    getAllCars: builder.query<ICar[], IGetAllCarsRequest>({
      query: (params: IGetAllCarsRequest) => ({
        url: `/autos-all`,
        params,
      }),
      providesTags: result => ['Cars']
    }),
    buyCar: builder.mutation<void, IBuyCarRequest>({
      query: (buyCarRequest) => ({
        url: '/autos/buy',
        method: 'POST',
        body: buyCarRequest,
      }),
      invalidatesTags: ['Cars']
    }),
    addCar: builder.mutation<any, FormData>({
      query: (addCarRequest) => ({
        url: '/autos/add',
        method: 'POST',
        body: addCarRequest,
      }),
      invalidatesTags: ['Cars']
    }),
    deleteCar: builder.mutation<void, number>({
      query: (carId) => ({
        url: `/autos/${carId}/delete`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Cars']
    }),
    updateCar: builder.mutation<void, ICarUpdateRequest>({
      query: (updateCarRequest) => ({
        url: `/autos/update`,
        method: 'PUT',
        body: updateCarRequest,
      }),
      invalidatesTags: ['OneCar', 'Cars']
    }),    
    addCarPhotos: builder.mutation<void, { carId: number, formData: FormData }>({
      query: ({ carId, formData }) => ({
        url: `/autos/${carId}/images`,
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['OneCar', 'Cars']
    }),
    deleteCarImage: builder.mutation<void, number>({
      query: (imgId) => ({
        url: `/autos/images/${imgId}/delete`,
        method: 'DELETE',
      }),
      invalidatesTags: ['OneCar', 'Cars']
    }),
  }),
});

export const {
  useGetAvailableCarsQuery,
  useGetOneCarQuery,
  useGetAllCarsQuery,
  useBuyCarMutation,
  useAddCarMutation,
  useDeleteCarMutation,
  useAddCarPhotosMutation,
  useUpdateCarMutation,
  useDeleteCarImageMutation,
} = carsApi;
