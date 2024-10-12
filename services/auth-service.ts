import { AuthUserDto, RequestUserDto, UserDto } from "@/dtos/user";
import { api } from "@/http/api";
import { PromisifyAxiosResponse } from "@/lib/axios/types";
import { AxiosInstance } from "axios";

type SignIn = (credentials: {
  email: string;
  password: string;
}) => PromisifyAxiosResponse<AuthUserDto>;

type Logout = () => PromisifyAxiosResponse<AuthUserDto>;

type SignUp = (user: RequestUserDto) => PromisifyAxiosResponse<AuthUserDto>;
type UpdateUser = (user: UserDto) => PromisifyAxiosResponse<AuthUserDto>;

export interface IAuthService {
  signIn: SignIn;
  signUp: SignUp;
  logout: Logout;
  updateUser: UpdateUser;
}

export class AuthService implements IAuthService {
  private constructor(public api: AxiosInstance) {}
  static create(api: AxiosInstance) {
    return new AuthService(api);
  }

  signIn: SignIn = (credentials) => {
    return this.api.post<AuthUserDto>("/api/auth/signin", credentials);
  };

  signUp: SignUp = (user) => {
    return this.api.post<AuthUserDto>("/api/auth/signup", user);
  };

  logout: Logout = () => {
    return this.api.post<AuthUserDto>("/api/auth/logout");
  };

  updateUser: UpdateUser = (user) => {
    const { id, ...rest } = user;
    return this.api.patch<AuthUserDto>(`/api/auth/user/${id}`, rest);
  };
}

export const authService = AuthService.create(api);
