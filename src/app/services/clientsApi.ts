import {IClient} from "@/shared/types/api-types";
import { api } from "./api";

export const clientsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCLients: builder.query<IClient[], void>({
      query: (carId) => ({ url: `/clients` }),
    })
  }),
});

export const {
  useGetCLientsQuery
} = clientsApi;
