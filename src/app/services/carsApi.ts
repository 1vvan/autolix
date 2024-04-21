import { IBuyCarRequest, ICar, ICarUpdateRequest, IGetAllCarsRequest} from "@/shared/types/api-types";
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
      providesTags: result => ['OneCar']
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
    addCar: builder.mutation<any, FormData>({
      query: (addCarRequest) => ({
        url: '/autos/add',
        method: 'POST',
        body: addCarRequest,
      }),
    }),
    deleteCar: builder.mutation<void, number>({
      query: (carId) => ({
        url: `/autos/${carId}/delete`,
        method: 'DELETE',
      }),
    }),
    updateCar: builder.mutation<void, ICarUpdateRequest>({
      query: (updateCarRequest) => ({
        url: `/autos/update`,
        method: 'PUT',
        body: updateCarRequest,
      }),
      invalidatesTags: ['OneCar']
    }),    
    addCarPhotos: builder.mutation<void, { carId: number, formData: FormData }>({
      query: ({ carId, formData }) => ({
        url: `/autos/${carId}/images`,
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['OneCar']
    }),
    deleteCarImage: builder.mutation<void, number>({
      query: (imgId) => ({
        url: `/autos/images/${imgId}/delete`,
        method: 'DELETE',
      }),
      invalidatesTags: ['OneCar']
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
