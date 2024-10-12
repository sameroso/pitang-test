import { AxiosResponse } from "axios";

export type TransformInAxiosResponse<TResponse = unknown> =
  AxiosResponse<TResponse>;

export type PromisifyAxiosResponse<TResponse = unknown> = Promise<
  TransformInAxiosResponse<TResponse>
>;
