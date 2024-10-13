import { getCookies } from "@/lib/cookies";
import { COLORS } from "@/style/constants";
import { appendVariableToBodyStyle, hexToCssHsl } from "@/style/utils";
import { useTheme } from "next-themes";
import { useCallback } from "react";

type Theme = "dark" | "light" | undefined;
export const useAppTheme = () => {
  const themeProps = useTheme();
  const theme: Theme = themeProps.theme as Theme;

  const setTheme = useCallback(
    (value: string, options?: { noApllySystemVars?: boolean }) => {
      const cookies = getCookies();
      themeProps.setTheme(value);

      if (value === "light") {
        document.querySelector("body")?.classList.add("light");
        document.querySelector("body")?.classList.remove("dark");
      }

      if (value === "dark") {
        document.querySelector("body")?.classList.remove("light");
        document.querySelector("body")?.classList.add("dark");
      }

      if (options?.noApllySystemVars) return;
      if (value === "light") {
        appendVariableToBodyStyle({
          value:
            hexToCssHsl(cookies?.preferences?.primary_color?.light, true) ||
            COLORS.light.primary,
          variable: "primary",
        });

        appendVariableToBodyStyle({
          variable: "secondary",
          value:
            hexToCssHsl(cookies?.preferences?.secondary_color?.light, true) ||
            COLORS.light.secondary,
        });
      }

      if (value === "dark") {
        appendVariableToBodyStyle({
          variable: "primary",
          value:
            hexToCssHsl(cookies?.preferences?.primary_color?.dark, true) ||
            COLORS.dark.primary,
        });

        appendVariableToBodyStyle({
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
