import { ExtraOptions } from "@/lib/redux/store";
import { fixerResponseMock } from "@/testing/mocks/fixer-api-mock";
import { createApi } from "@reduxjs/toolkit/query/react";

export const currenciesApi = createApi({
  reducerPath: "currenciesApi",
  baseQuery: async (args, api, extraOptions) => {
    const res = await (
      extraOptions as ExtraOptions
    ).extra.currencyService.getCurrencies();
    return { data: res.data };
  },
  endpoints: (builder) => ({
    getCurrencies: builder.query<typeof fixerResponseMock, void>({
      queryFn: async (_, extraOptions: ExtraOptions) => {
        const res = await extraOptions.extra.currencyService.getCurrencies();
        return { data: res.data };
      },
    }),
  }),
});

export const { useGetCurrenciesQuery } = currenciesApi;
