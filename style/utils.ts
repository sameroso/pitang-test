export const checkHexValidity = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return {
    isValid: !(!result || result.length !== 4) && result?.[0].startsWith("#"),
    value: result,
  };
};

export function hexToCssHsl(hex?: string, valuesOnly = false) {
  const result = checkHexValidity(hex || "");
  if (!result.isValid) return "";

  let r = parseInt(result.value![1], 16);
  let g = parseInt(result.value![2], 16);
  let b = parseInt(result.value![3], 16);
  let cssString = "";
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  (r /= 255), (g /= 255), (b /= 255);
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h = 1,
    s,
    l = (max + min) / 2;
  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  h = Math.round(h * 360);
  s = Math.round(s * 100);
  l = Math.round(l * 100);

  cssString = h + " " + s + "% " + l + "%";
  cssString = !valuesOnly ? "hsl(" + cssString + ")" : cssString;

  return cssString;
}

export function hslToHex(hsl: string) {
  const hslValues = hsl
    .replaceAll("%", "")
    .split(" ")
    .map((val) => Number(val));

  const h = hslValues[0];
  const s = hslValues[1];
  let l = hslValues[2];

  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, "0"); // convert to Hex and prefix "0" if needed
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

type Variables = "primary" | "secondary";
const variableMapper: Record<Variables, string> = {
  primary: "--primary",
  secondary: "--secondary",
};
export const appendVariableToBodyStyle = ({
  variable,
  value,
}: {
  variable: Variables;
  value: string;
}) => {
  document!
    .querySelector("body")!
    .attributeStyleMap.set(variableMapper[variable], value);
};

export const removeVariableFromHtmlStyle = ({
  variable,
}: {
  variable: Variables;
}) => {
  document!.querySelector("body")!.style.removeProperty(variable);
};
