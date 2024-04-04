import {
  LoginDTO,
  LoginResponce,
  RegisterDTO,
} from "@/shared/types/api-types";
import { api } from "./api";
import { IUser } from "@/shared/types/IUser";

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    fetchLogin: builder.mutation<LoginResponce, LoginDTO>({
      query: (data: LoginDTO) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),
    }),
    fetchRegister: builder.mutation<LoginResponce, RegisterDTO>({
      query: (data: RegisterDTO) => ({
        url: "/register",
        method: "POST",
        body: data,
      }),
    }),
    getUser: builder.query<IUser, number | string | null>({
      query: (id) => ({ url: `/user/${id}` }),
    })
  }),
});

export const { useFetchLoginMutation, useFetchRegisterMutation, useGetUserQuery } = userApi;
