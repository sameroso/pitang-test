// import { api } from "@/http/api";
// import { dbApi } from "@/http/dbApi";
import { PromisifyAxiosResponse } from "@/lib/axios/types";
import { AxiosInstance } from "axios";
import { RequestUserDto, UserDto } from "@/dtos/user";
import { dbApi } from "@/http/dbApi";

type GetUserById = (id: string) => PromisifyAxiosResponse<UserDto>;
type GetUserByEmail = (email: string) => PromisifyAxiosResponse<UserDto[]>;
type UpdateUser = (
  id: string,
  user: Partial<UserDto>
) => PromisifyAxiosResponse<UserDto>;
type CreateUser = (user: RequestUserDto) => PromisifyAxiosResponse<UserDto>;

export interface IUserService {
  getUserById: GetUserById;
  updateUser: UpdateUser;
  createUser: CreateUser;
  getUserByEmail: GetUserByEmail;
}

export class UserService implements IUserService {
  private constructor(public api: AxiosInstance) {}
  static create(api: AxiosInstance) {
    return new UserService(api);
  }
  getUserById: GetUserById = (id) => {
    return this.api.get<UserDto>(`/user/${id}`);
  };
  createUser: CreateUser = (user) => {
    return this.api.post<UserDto>(`/users`, user);
  };
  getUserByEmail = (email: string) => {
    return this.api.get<UserDto[]>(`/users`, { params: { email: email } });
  };
  updateUser: UpdateUser = (id, user) => {
    return this.api.patch<UserDto>(`/users/${id}`, user);
  };
}

export const userService = UserService.create(dbApi);
