import { IGetSalesRequest, ISale} from "@/shared/types/api-types";
import { api } from "./api";

export const salesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getSales: builder.query<ISale[], IGetSalesRequest>({
      query: (carId) => ({ url: `/sales` }),
    })
  }),
});

export const {
  useGetSalesQuery
} = salesApi;
