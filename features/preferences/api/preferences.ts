import { PreferencesDto } from "@/dtos/user";
import { getCookies } from "@/lib/cookies";
import { ExtraOptions } from "@/lib/redux/store";
import { createApi } from "@reduxjs/toolkit/query/react";

export const preferencesApi = createApi({
  reducerPath: "preferenceApi",
  tagTypes: ["preferences"],
  baseQuery: async () => {
    try {
      const res = getCookies();
      return { data: res.preferences };
    } catch (e: unknown) {
      return { error: e };
    }
  },
  endpoints: (builder) => ({
    getPreferences: builder.query<PreferencesDto, void>({
      queryFn: async () => {
        try {
          const res = getCookies();

          return { data: res.preferences };
        } catch (e: unknown) {
          return { error: e };
        }
      },
      providesTags: () => [{ type: "preferences", id: "getPreferences" }],
    }),

    updatePreferences: builder.mutation<
      PreferencesDto,
      Omit<PreferencesDto, "user_id">
    >({
      queryFn: async (
        userPreferences: Omit<PreferencesDto, "user_id">,
        extraOptions: ExtraOptions,
      ) => {
        try {
          const res =
            await extraOptions.extra.authService.updateUserPreferences(
              userPreferences,
            );
          return { data: res.data };
        } catch (e: unknown) {
          return { error: e };
        }
      },
      invalidatesTags: [{ type: "preferences", id: "getPreferences" }],
    }),
  }),
});

export const { useGetPreferencesQuery, useUpdatePreferencesMutation } =
  preferencesApi;
