import { userApi } from "@/features/auth/api/user";
import { currenciesApi } from "@/features/currency/api/currency-api";
import { IAuthService } from "@/services/auth-service";
import { ICurrecyService } from "@/services/currency-service";
import { configureStore } from "@reduxjs/toolkit";
import { BaseQueryApi } from "@reduxjs/toolkit/query";

export const makeStore = (extraArgument: ExtraArgument) => {
  return configureStore({
    reducer: {
      [currenciesApi.reducerPath]: currenciesApi.reducer,
      [userApi.reducerPath]: userApi.reducer,
    },
    devTools: true,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument,
        },
      })
        .concat(currenciesApi.middleware)
        .concat(userApi.middleware),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
export type ExtraArgument = {
  currencyService: ICurrecyService;
  authService: IAuthService;
};

export type ExtraOptions = BaseQueryApi & { extra: ExtraArgument };
