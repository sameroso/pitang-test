import { CurrenciesDTO } from "@/dtos/currency";
import { ICurrecyService } from "@/services/currency-service";
import { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { fixerResponseMock } from "../fixer-api-mock";

export const GetCurrencySuccessMockService: ICurrecyService = {
  getCurrencies: () => {
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
  },
};

export const GetCurrencyErrorMockService: ICurrecyService = {
  getCurrencies: () => {
    return new Promise<AxiosResponse<CurrenciesDTO>>((res, rej) => {
      return setTimeout(() => {
        return rej(new AxiosError());
      }, 100);
    });
  },
};
