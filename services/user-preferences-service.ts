// import { api } from "@/http/api";
// import { dbApi } from "@/http/dbApi";
import { CreatePreferencesDto, PreferencesDto } from "@/dtos/user";
import { dbApi } from "@/http/db-api";
import { PromisifyAxiosResponse } from "@/lib/axios/types";
import { AxiosInstance } from "axios";

type GetUserSettingsByUserId = (
  userId: string
) => PromisifyAxiosResponse<Partial<PreferencesDto>[]>;

type CreateSettings = (
  settings: CreatePreferencesDto
) => PromisifyAxiosResponse<Partial<PreferencesDto>>;

type UpdateSettings = (
  userId: string,
  settings: Partial<CreatePreferencesDto>
) => PromisifyAxiosResponse<Partial<PreferencesDto>>;

export interface IUserPreferencerService {
  getUserSettingsByUserId: GetUserSettingsByUserId;
  create: CreateSettings;
  update: UpdateSettings;
}

export class UserPreferencesService implements IUserPreferencerService {
  private constructor(public api: AxiosInstance) {}
  static create(api: AxiosInstance) {
    return new UserPreferencesService(api);
  }

  create: CreateSettings = (settings) => {
    return this.api.post<PreferencesDto>("/preferences", settings);
  };

  update: UpdateSettings = (id, settings) => {
    return this.api.patch<PreferencesDto>(`/preferences/${id}`, settings);
  };

  getUserSettingsByUserId: GetUserSettingsByUserId = (userId) => {
    return this.api.get<PreferencesDto[]>(`/preferences?user_id=${userId}`);
  };
}

export const userPreferencesService = UserPreferencesService.create(dbApi);
