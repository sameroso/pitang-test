// import { api } from "@/http/api";
// import { dbApi } from "@/http/dbApi";
import { CreateSettingsDto, SettingsDto } from "@/dtos/user";
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

export interface ISettingsService {
  getUserSettingsByUserId: GetUserSettingsByUserId;
  create: CreateSettings;
  update: UpdateSettings;
}

export class SettingsService implements ISettingsService {
  private constructor(public api: AxiosInstance) {}
  static create(api: AxiosInstance) {
    return new SettingsService(api);
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
