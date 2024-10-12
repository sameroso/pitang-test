import { AuthUserDto, RequestUserDto } from "@/dtos/user";
import { ExtraOptions } from "@/lib/redux/store";
import { createApi } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: async (args, api, extraOptions) => {
    const res = await (extraOptions as ExtraOptions).extra.authService.signIn(
      args
    );
    return { data: res.data };
  },
  endpoints: (builder) => ({
    signIn: builder.mutation<AuthUserDto, { email: string; password: string }>({
      queryFn: async ({ email, password }, extraOptions: ExtraOptions) => {
        try {
          const res = await extraOptions.extra.authService.signIn({
            email,
            password,
          });
          return { data: res.data };
        } catch (e: unknown) {
          return { error: e };
        }
      },
    }),
    signUp: builder.mutation<RequestUserDto, RequestUserDto>({
      queryFn: async (user, extraOptions: ExtraOptions) => {
        try {
          const res = await extraOptions.extra.authService.signUp(user);
          return { data: res.data };
        } catch (e: unknown) {
          return { error: e };
        }
      },
    }),

    logout: builder.mutation<AuthUserDto, void>({
      queryFn: async (_, extraOptions: ExtraOptions) => {
        try {
          const res = await extraOptions.extra.authService.logout();
          return { data: res.data };
        } catch (e: unknown) {
          return { error: e };
        }
      },
    }),
  }),
});

export const { useSignInMutation, useSignUpMutation, useLogoutMutation } =
  userApi;
