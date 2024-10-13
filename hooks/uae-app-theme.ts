import { getCookies } from "@/lib/cookies";
import { hexToCssHsl } from "@/style/utils";
import { useTheme } from "next-themes";
import { useCallback } from "react";

export const useAppTheme = () => {
  const themeProps = useTheme();
  const setTheme = useCallback(
    (value: string) => {
      const cookies = getCookies(document.cookie);
      themeProps.setTheme(value);
      console.log(cookies,value)
      if (value === "light") {
        if (cookies?.preferences?.primary_color?.light) {
          document!
            .querySelector("html")!
            .attributeStyleMap.set(
              "--primary",
              cookies?.preferences?.primary_color?.light
            );
        }

        if (cookies?.preferences?.secondary_color?.light) {
          document!
            .querySelector("html")!
            .attributeStyleMap.set(
              "--secondary",
              hexToCssHsl(
                cookies?.preferences?.secondary_color?.light,
                true
              )
            );
        }
      }

      if (value === "dark") {
        if (cookies?.preferences?.primary_color?.dark) {
          document!
            .querySelector("html")!
            .attributeStyleMap.set(
              "--primary",
              cookies?.preferences?.primary_color?.dark
            );
        }

        if (cookies?.preferences?.secondary_color?.dark) {
          document!
            .querySelector("html")!
            .attributeStyleMap.set(
              "--secondary",
              hexToCssHsl(
                cookies?.preferences?.secondary_color?.dark,
                true
              )
            );
        }
      }
    },
    [themeProps]
  );

  return { ...themeProps, setTheme };
};
