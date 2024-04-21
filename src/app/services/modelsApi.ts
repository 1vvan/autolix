import { IAllCarsModels } from "@/shared/types/api-types";
import { api } from "./api";

export const modelsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getCarsAllModels: builder.query<IAllCarsModels, void>({
            query: () => ({ url: `/autos-models` }),
            providesTags: result => ['CarsModels']
        }),
        addBrand: builder.mutation<any, string>({
            query: (name) => ({
                url: '/brands/add',
                method: 'POST',
                body: { name },
            }),
            invalidatesTags: ['CarsModels']
        }),
        addModel: builder.mutation<any, { brand_id: number; name: string }>({
            query: ({ brand_id, name }) => ({
                url: '/models/add',
                method: 'POST',
                body: { brand_id, name },
            }),
            invalidatesTags: ['CarsModels']
        }),
        deleteModel: builder.mutation<void, number>({
            query: (modelId) => ({
                url: `/models/${modelId}/delete`,
                method: 'DELETE',
            }),
            invalidatesTags: ['CarsModels']
        }),
        deleteBrand: builder.mutation<void, number>({
            query: (brandId) => ({
                url: `/brands/${brandId}/delete`,
                method: 'DELETE',
            }),
            invalidatesTags: ['CarsModels']
        }),
    }),
});

export const {
    useGetCarsAllModelsQuery,
    useAddBrandMutation,
    useAddModelMutation,
    useDeleteBrandMutation,
    useDeleteModelMutation
} = modelsApi;
