import { getCookies } from "@/lib/cookies";
import { COLORS } from "@/style/constants";
import { appendVariableToHtmlStyle, hexToCssHsl } from "@/style/utils";
import { useTheme } from "next-themes";
import { useCallback } from "react";

type Theme = "dark" | "light" | undefined;
export const useAppTheme = () => {
  const themeProps = useTheme();
  const theme: Theme = themeProps.theme as Theme;
  const setTheme = useCallback(
    (value: string) => {
      const cookies = getCookies();
      themeProps.setTheme(value);
      if (value === "light") {
        appendVariableToHtmlStyle({
          value:
            hexToCssHsl(cookies?.preferences?.primary_color?.light, true) ||
            COLORS.light.primary,
          variable: "primary",
        });

        appendVariableToHtmlStyle({
          variable: "secondary",
          value:
            hexToCssHsl(cookies?.preferences?.secondary_color?.light, true) ||
            COLORS.light.secondary,
        });
      }

      if (value === "dark") {
        appendVariableToHtmlStyle({
          variable: "primary",
          value:
            hexToCssHsl(cookies?.preferences?.primary_color?.dark, true) ||
            COLORS.dark.primary,
        });

        appendVariableToHtmlStyle({
          variable: "secondary",
          value:
            hexToCssHsl(cookies?.preferences?.secondary_color?.dark, true) ||
            COLORS.dark.secondary,
        });
      }
    },
    [themeProps]
  );

  return { ...themeProps, setTheme, theme };
};
