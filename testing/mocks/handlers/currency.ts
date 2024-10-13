import { ICurrecyService, CurrenciesDTO } from "@/services/currency-service";
import { AxiosResponse, InternalAxiosRequestConfig } from "axios";

export const getCurrencyError = () => {
  return new Promise<AxiosResponse<CurrenciesDTO>>((res, rej) => {
    return setTimeout(() => {
      return rej({
        config: {} as InternalAxiosRequestConfig,
        data: undefined,
        headers: {},
        status: 404,
        statusText: "",
      });
    }, 50);
  });
};

export const CurrencyhandlerError: ICurrecyService = {
  getCurrencies() {
    return getCurrencyError();
  },
};
