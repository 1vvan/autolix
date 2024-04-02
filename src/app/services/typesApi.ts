import { AllTypes } from "@/shared/types/api-types";
import { api } from "./api";

export const typesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getTypes: builder.query<AllTypes, void>({
      query: () => ({ url: "/types-info" }),
    })
  }),
});

export const {
  useGetTypesQuery
} = typesApi;
