export interface UserDto {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  country: string;
  password: string;
}

export type RequestUserDto = Omit<UserDto, "id">;

export type AuthUserDto = Omit<UserDto, "password"> & { password?: never };
export type RequestAuthUserDto = Omit<AuthUserDto, "id"> & { password: never };

export interface PreferencesDto {
  id: string;
  user_id: string;
  primary_color?: { dark?: string; light?: string };
  secondary_color?: { dark?: string; light?: string };
  mode?: string;
}

export type CreatePreferencesDto = Partial<Omit<PreferencesDto, "id" | "user_id">> &
  Pick<PreferencesDto, "user_id">;
