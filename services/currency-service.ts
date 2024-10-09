import { fixerResponseMock } from "@/testing/mocks/fixer-api-mock";
import { AxiosResponse, InternalAxiosRequestConfig } from "axios";

export const getCurrencies = () => {
  return new Promise<AxiosResponse<typeof fixerResponseMock>>((res) => {
    return setTimeout(() => {
      return res({
        config: {} as InternalAxiosRequestConfig,
        data: fixerResponseMock,
        headers: {},
        status: 200,
        statusText: "",
      });
    }, 1000);
  });
};
