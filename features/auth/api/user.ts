import { AuthUserDto, RequestUserDto, UserDto } from "@/dtos/user";
import { getCookies } from "@/lib/cookies";
import { ExtraOptions } from "@/lib/redux/store";
import { createApi } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  tagTypes: ["user"],
  baseQuery: async () => {
    try {
      const res = getCookies();
      if (!res?.user) {
        return { data: {} };
      }
      return { data: res.user };
    } catch (e: unknown) {
      return { error: e };
    }
  },
  endpoints: (builder) => ({
    getUser: builder.query<AuthUserDto, void>({
      queryFn: () => {
        const res = getCookies();
        if (!res?.user) {
          return { error: { message: "Não foi possível encontrar usuárop" } };
        }
        return { data: res.user };
      },
      providesTags: () => [{ type: "user", id: "getuser" }],
    }),
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

      invalidatesTags: [{ type: "user", id: "getuser" }],
    }),
    signUp: builder.mutation<AuthUserDto, RequestUserDto>({
      queryFn: async (user, extraOptions: ExtraOptions) => {
        try {
          const res = await extraOptions.extra.authService.signUp(user);
          return { data: res.data };
        } catch (e: unknown) {
          return { error: e };
        }
      },
      invalidatesTags: [{ type: "user", id: "getuser" }],
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

    updateUser: builder.mutation<AuthUserDto, UserDto>({
      queryFn: async (user, extraOptions: ExtraOptions) => {
        try {
          const res = await extraOptions.extra.authService.updateUser(user);
          return { data: res.data };
        } catch (e: unknown) {
          return { error: e };
        }
      },
      invalidatesTags: [{ type: "user", id: "getuser" }],
    }),
  }),
});

export const {
  useSignInMutation,
  useSignUpMutation,
  useLogoutMutation,
  useGetUserQuery,
  useUpdateUserMutation,
} = userApi;
