// import { api } from "@/http/api";
// import { dbApi } from "@/http/dbApi";
import { CreateSettingsDto, SettingsDto } from "@/dtos/user";
import { dbApi } from "@/http/db-api";
import { PromisifyAxiosResponse } from "@/lib/axios/types";
import { AxiosInstance } from "axios";

type GetUserSettingsByUserId = (
  userId: string
) => PromisifyAxiosResponse<Partial<SettingsDto>[]>;

type CreateSettings = (
  settings: CreateSettingsDto
) => PromisifyAxiosResponse<Partial<SettingsDto>>;

type UpdateSettings = (
  userId: string,
  settings: SettingsDto
) => PromisifyAxiosResponse<Partial<SettingsDto>>;

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
    return this.api.post<SettingsDto>("/preferences", settings);
  };

  update: UpdateSettings = (id, settings) => {
    return this.api.patch<SettingsDto>(`/preferences/${id}`, settings);
  };

  getUserSettingsByUserId: GetUserSettingsByUserId = (userId) => {
    return this.api.get<SettingsDto[]>(`/preferences?user_id=${userId}`);
  };
}

export const userPreferencesService = UserPreferencesService.create(dbApi);
