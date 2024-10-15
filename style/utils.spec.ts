import { checkHexValidity, hexToCssHsl, hslToHex } from "./utils";

describe("checkHexValidity", () => {
  it("should return isValid true for valid hex with #", () => {
    const result = checkHexValidity("#FF0000");
    expect(result.isValid).toBe(true);
  });

  it("should return isValid false for valid hex without #", () => {
    const result = checkHexValidity("FF0000");
    expect(result.isValid).toBe(false);
  });

  it("should return isValid false for invalid hex", () => {
    const result = checkHexValidity("#GG0000");
    expect(result.isValid).toBe(false);
  });

  it("should return isValid false for short hex", () => {
    const result = checkHexValidity("#F00");
    expect(result.isValid).toBe(false);
  });

  it("should return isValid false for long hex", () => {
    const result = checkHexValidity("#FF00001");
    expect(result.isValid).toBe(false);
  });

  it("should return correct value for valid hex", () => {
    const result = checkHexValidity("#FF0000");
    expect(result.value?.toString()).toEqual(
      ["#FF0000", "FF", "00", "00"].toString(),
    );
  });

  it("should return null value for invalid hex", () => {
    const result = checkHexValidity("invalid");
    expect(result.value).toBe(null);
  });
});

describe("hexToCssHsl", () => {
  test("converts valid hex to HSL", () => {
    expect(hexToCssHsl("#ff0000")).toBe("hsl(0 100% 50%)");
    expect(hexToCssHsl("#00ff00")).toBe("hsl(120 100% 50%)");
    expect(hexToCssHsl("#0000ff")).toBe("hsl(240 100% 50%)");
  });

  test("does not convert valid hex without # to HSL", () => {
    expect(hexToCssHsl("ff0000")).toBe("");
  });

  test("returns values only when valuesOnly is true", () => {
    expect(hexToCssHsl("#ff0000", true)).toBe("0 100% 50%");
    expect(hexToCssHsl("#00ff00", true)).toBe("120 100% 50%");
    expect(hexToCssHsl("#0000ff", true)).toBe("240 100% 50%");
  });

  test("handles black and white correctly", () => {
    expect(hexToCssHsl("#000000")).toBe("hsl(0 0% 0%)");
    expect(hexToCssHsl("#ffffff")).toBe("hsl(0 0% 100%)");
  });

  test("handles grayscale colors correctly", () => {
    expect(hexToCssHsl("#808080")).toBe("hsl(0 0% 50%)");
    expect(hexToCssHsl("#c0c0c0")).toBe("hsl(0 0% 75%)");
  });

  test("returns empty string for invalid hex values", () => {
    expect(hexToCssHsl("#gggggg")).toBe("");
    expect(hexToCssHsl("invalid")).toBe("");
    expect(hexToCssHsl("")).toBe("");
    expect(hexToCssHsl()).toBe("");
  });
});

describe("hslToHex", () => {
  test("converts basic HSL values to hex", () => {
    expect(hslToHex("0 100% 50%")).toBe("#ff0000");
    expect(hslToHex("120 100% 50%")).toBe("#00ff00");
    expect(hslToHex("240 100% 50%")).toBe("#0000ff");
  });

  test("handles HSL values without percentage signs", () => {
    expect(hslToHex("0 100 50")).toBe("#ff0000");
    expect(hslToHex("120 100 50")).toBe("#00ff00");
    expect(hslToHex("240 100 50")).toBe("#0000ff");
  });

  test("converts black and white correctly", () => {
    expect(hslToHex("0 0% 0%")).toBe("#000000");
    expect(hslToHex("0 0% 100%")).toBe("#ffffff");
  });

  test("handles grayscale colors", () => {
    expect(hslToHex("0 0% 50%")).toBe("#808080");
    expect(hslToHex("0 0% 75%")).toBe("#bfbfbf");
  });

  test("converts HSL values with decimal places", () => {
    expect(hslToHex("180 50% 75%")).toBe("#9fdfdf");
    expect(hslToHex("210.5 65.5% 42.2%")).toBe("#256ab2");
  });

  test("handles edge cases", () => {
    expect(hslToHex("360 100% 50%")).toBe("#ff0000"); // 360 degrees is the same as 0
    expect(hslToHex("0 0% 50%")).toBe("#808080"); // Middle gray
    expect(hslToHex("180 100% 50%")).toBe("#00ffff"); // Cyan
  });
});
