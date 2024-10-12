import { fixerResponseMock } from "@/testing/mocks/fixer-api-mock";
import { AxiosResponse, InternalAxiosRequestConfig } from "axios";

export interface CurrenciesDTO {
  success: boolean;
  timestamp: number;
  historical: boolean;
  base: string;
  date: string;
  rates: Record<string, number>;
}

export const getCurrencies = () => {
  return new Promise<AxiosResponse<CurrenciesDTO>>((res) => {
    return setTimeout(() => {
      return res({
        config: {} as InternalAxiosRequestConfig,
        data: fixerResponseMock,
        headers: {},
        status: 200,
        statusText: "",
      });
    }, 100);
  });
};

export interface ICurrecyService {
  getCurrencies: () => Promise<AxiosResponse<CurrenciesDTO>>;
}

export const currencyService: ICurrecyService = {
  getCurrencies,
};
