import { IGetSalesRequest, ISale} from "@/shared/types/api-types";
import { api } from "./api";

export const salesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getSales: builder.query<ISale[], IGetSalesRequest>({
      query: (params: IGetSalesRequest) => ({
        url: `/sales`,
        params,
      }),
    })
  }),
});

export const {
  useGetSalesQuery
} = salesApi;
