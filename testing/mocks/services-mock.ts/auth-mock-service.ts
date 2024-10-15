import { IAuthService } from "@/services/auth-service";
import { AxiosError, InternalAxiosRequestConfig } from "axios";

export const authMockServiceSuccess: IAuthService = {
  logout: () => {
    return new Promise((res) => {
      return setTimeout(() => {
        return res({
          config: {} as InternalAxiosRequestConfig,
          headers: {},
          data: {
            country: "",
            email: "",
            first_name: "",
            id: "",
            last_name: "",
          },
          status: 200,
          statusText: "ok",
        });
      }, 100);
    });
  },

  signIn: () => {
    return new Promise((res) => {
      return setTimeout(() => {
        return res({
          config: {} as InternalAxiosRequestConfig,
          headers: {},
          data: {
            country: "",
            email: "jhon@email.com",
            first_name: "john",
            id: "",
            last_name: "",
          },
          status: 200,
          statusText: "ok",
        });
      }, 100);
    });
  },
  signUp: () => {
    return new Promise((res) => {
      return setTimeout(() => {
        return res({
          config: {} as InternalAxiosRequestConfig,
          headers: {},
          data: {
            country: "",
            email: "",
            first_name: "",
            id: "",
            last_name: "",
          },
          status: 200,
          statusText: "ok",
        });
      }, 100);
    });
  },

  updateUser: () => {
    return new Promise((res) => {
      return setTimeout(() => {
        return res({
          config: {} as InternalAxiosRequestConfig,
          headers: {},
          data: {
            country: "",
            email: "",
            first_name: "",
            id: "",
            last_name: "",
          },
          status: 200,
          statusText: "ok",
        });
      }, 100);
    });
  },

  updateUserPreferences: () => {
    return new Promise((res) => {
      return setTimeout(() => {
        return res({
          config: {} as InternalAxiosRequestConfig,
          headers: {},
          data: {
            id: "",
            mode: "",
            primary_color: { dark: "", light: "" },
            secondary_color: { dark: "", light: "" },
            user_id: "",
          },
          status: 200,
          statusText: "ok",
        });
      }, 100);
    });
  },
};

export const authMockServiceError: IAuthService = {
  logout: () => {
    return new Promise((res, rej) => {
      return setTimeout(() => {
        return rej(new AxiosError());
      }, 100);
    });
  },

  signIn: () => {
    return new Promise((res, rej) => {
      return setTimeout(() => {
        return rej(new AxiosError());
      }, 100);
    });
  },
  signUp: () => {
    return new Promise((res, rej) => {
      return setTimeout(() => {
        return rej(new AxiosError());
      }, 100);
    });
  },

  updateUser: () => {
    return new Promise((res, rej) => {
      return setTimeout(() => {
        return rej(new AxiosError());
      }, 100);
    });
  },

  updateUserPreferences: () => {
    return new Promise((res, rej) => {
      return setTimeout(() => {
        return rej(new AxiosError());
      }, 100);
    });
  },
};
