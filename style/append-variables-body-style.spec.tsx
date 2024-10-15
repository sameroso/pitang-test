import { render } from "@testing-library/react";
import {
  appendVariableToBodyStyle,
  removeVariableFromBodyStyle,
} from "./utils";

describe("DOM Style Manipulation Functions", () => {
  describe("appendVariableToBodyStyle", () => {
    beforeEach(() => {
      render(<div>test</div>);
    });
    test("appends primary variable to body style", () => {
      appendVariableToBodyStyle({ variable: "primary", value: "#ff0000" });
      expect(document.body.style.getPropertyValue("--primary")).toBe("#ff0000");
    });

    test("appends secondary variable to body style", () => {
      appendVariableToBodyStyle({ variable: "secondary", value: "#00ff00" });
      expect(document.body.style.getPropertyValue("--secondary")).toBe(
        "#00ff00",
      );
    });

    test("overwrites existing variable value", () => {
      appendVariableToBodyStyle({ variable: "primary", value: "#ff0000" });
      appendVariableToBodyStyle({ variable: "primary", value: "#0000ff" });
      expect(document.body.style.getPropertyValue("--primary")).toBe("#0000ff");
    });
  });

  describe("removeVariableFromHtmlStyle", () => {
    test("removes primary variable from body style", () => {
      appendVariableToBodyStyle({ variable: "primary", value: "#ff0000" });
      removeVariableFromBodyStyle({ variable: "primary" });
      expect(document.body.style.getPropertyValue("--primary")).toBe("");
    });

    test("removes secondary variable from body style", () => {
      appendVariableToBodyStyle({ variable: "secondary", value: "#00ff00" });
      removeVariableFromBodyStyle({ variable: "secondary" });
      expect(document.body.style.getPropertyValue("--secondary")).toBe("");
    });

    test("does nothing if variable does not exist", () => {
      removeVariableFromBodyStyle({ variable: "primary" });
      expect(document.body.style.getPropertyValue("--primary")).toBe("");
    });
  });
});
