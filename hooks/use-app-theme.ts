import { CreatePreferencesDto } from "@/dtos/user";
import { useGetPreferencesQuery } from "@/features/preferences/api/preferences";
import { COLORS } from "@/style/constants";
import { appendVariableToBodyStyle, hexToCssHsl } from "@/style/utils";
import { useTheme } from "next-themes";
import { useCallback } from "react";

type Theme = "dark" | "light" | undefined;
export const useAppTheme = () => {
  const themeProps = useTheme();
  const theme: Theme = themeProps.theme as Theme;

  const { data } = useGetPreferencesQuery();

  const setTheme = useCallback(
    (args: Omit<CreatePreferencesDto, "user_id">) => {
      themeProps.setTheme(args.mode || theme || "");

      if ((args.mode || theme) === "light") {
        document.querySelector("body")?.classList.add("light");
        document.querySelector("body")?.classList.remove("dark");

        appendVariableToBodyStyle({
          value:
            hexToCssHsl(
              args.primary_color?.light || data?.primary_color?.light,
              true
            ) || COLORS.light.primary,
          variable: "primary",
        });

        appendVariableToBodyStyle({
          variable: "secondary",
          value:
            hexToCssHsl(
              args.secondary_color?.light || data?.secondary_color?.light,
              true
            ) || COLORS.light.secondary,
        });
      }

      if ((args.mode || theme) === "dark") {
        document.querySelector("body")?.classList.remove("light");
        document.querySelector("body")?.classList.add("dark");

        appendVariableToBodyStyle({
          variable: "primary",
          value:
            hexToCssHsl(
              args.primary_color?.dark || data?.primary_color?.dark,
              true
            ) || COLORS.dark.primary,
        });

        appendVariableToBodyStyle({
          variable: "secondary",
          value:
            hexToCssHsl(
              args.secondary_color?.dark || data?.secondary_color?.dark,
              true
            ) || COLORS.dark.secondary,
        });
      }
    },
    [
      data?.primary_color?.dark,
      data?.primary_color?.light,
      data?.secondary_color?.dark,
      data?.secondary_color?.light,
      theme,
      themeProps,
    ]
  );

  return { ...themeProps, setTheme, theme };
};
