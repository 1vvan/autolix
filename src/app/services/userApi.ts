import {
  LoginDTO,
  LoginResponce,
  RegisterDTO,
  RequestUpdateUserData,
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
    fetchRegister: builder.mutation<IUser, RegisterDTO>({
      query: (data: RegisterDTO) => ({
        url: "/register",
        method: "POST",
        body: data,
      }),
    }),
    getCurrentUser: builder.query<IUser, string>({
      query: () => ({ url: "/user" }),
    }),
    updateUser: builder.mutation<IUser, RequestUpdateUserData>({
      query: (data: RequestUpdateUserData) => ({
        url: `/user/${data.userId}`,
        method: "POST",
        body: data.data,
      }),
    }),
  }),
});

export const { useFetchLoginMutation, useFetchRegisterMutation, useGetCurrentUserQuery, useUpdateUserMutation } = userApi;
