import {IClient} from "@/shared/types/api-types";
import { api } from "./api";

export const clientsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCLients: builder.query<IClient[], void>({
      query: () => ({ url: `/clients` }),
    }),
    getCLientPurchases: builder.query<IClient[], number>({
      query: (userId) => ({ url: `/clients/${userId}/purchases` }),
    })
  }),
});

export const {
  useGetCLientsQuery,
  useGetCLientPurchasesQuery
} = clientsApi;
