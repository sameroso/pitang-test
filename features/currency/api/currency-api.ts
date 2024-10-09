import { getCurrencies } from "@/services/currency-service";
import { fixerResponseMock } from "@/testing/mocks/fixer-api-mock";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const currenciesApi = createApi({
  reducerPath: "currenciesApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/" }),
  endpoints: (builder) => ({
    getCurrencies: builder.query<typeof fixerResponseMock, void>({
      queryFn: async () => {
        const res = await getCurrencies();
        return { data: res.data };
      },
    }),
  }),
});

export const { useGetCurrenciesQuery } = currenciesApi;
