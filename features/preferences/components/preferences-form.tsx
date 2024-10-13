"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import {
  appendVariableToBodyStyle,
  checkHexValidity,
  hexToCssHsl,
  hslToHex,
} from "@/style/utils";
import { PropsWithChildren } from "react";
import { COLORS } from "@/style/constants";
import { Redo2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChangeThemeColorInput } from "./change-theme-color-input";
import { useAppTheme } from "@/hooks/use-app-theme";

const formSchema = z
  .object({
    preferredMode: z
      .enum(["light", "dark"], {
        required_error: "You need to select a mode.",
      })
      .or(z.literal("")),
    lightModePrimary: z
      .string()
      .regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
        message: "Must be a valid hex color code",
      })
      .or(z.literal("")),
    lightModeSecondary: z
      .string()
      .regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
        message: "Must be a valid hex color code",
      })
      .or(z.literal("")),
    darkModePrimary: z
      .string()
      .regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
        message: "Must be a valid hex color code",
      })
      .or(z.literal("")),
    darkModeSecondary: z
      .string()
      .regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
        message: "Must be a valid hex color code",
      })
      .or(z.literal("")),
  })
  .partial();

export type PreferencesFormSchema = z.infer<typeof formSchema>;

interface UserPreferencesForm {
  defaultValues?: PreferencesFormSchema;
  onSubmit: (values: PreferencesFormSchema) => void;
}

export function UserPreferencesForm({
  defaultValues,
  onSubmit,
  children,
}: PropsWithChildren<UserPreferencesForm>) {
  const { setTheme, theme } = useAppTheme();

  const form = useForm<PreferencesFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      preferredMode: defaultValues?.preferredMode,
      lightModePrimary:
        defaultValues?.lightModePrimary || hslToHex(COLORS.light.primary),
      lightModeSecondary:
        defaultValues?.lightModeSecondary || hslToHex(COLORS.light.secondary),
      darkModePrimary:
        defaultValues?.darkModePrimary || hslToHex(COLORS.dark.primary),
      darkModeSecondary:
        defaultValues?.darkModeSecondary || hslToHex(COLORS.dark.secondary),
    },
  });

  const getColorHslVariable = (
    colorVariable: keyof Omit<PreferencesFormSchema, "preferredMode">
  ) => {
    return hexToCssHsl(form.getValues(colorVariable) || "", true);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="preferredMode"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Modo preferido</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={(themeOption) => {
                    if (themeOption === "light") {
                      if (
                        checkHexValidity(
                          form.getValues("lightModePrimary") || ""
                        ).isValid
                      ) {
                        appendVariableToBodyStyle({
                          value: getColorHslVariable("lightModePrimary"),
                          variable: "primary",
                        });
                      }

                      if (
                        checkHexValidity(
                          form.getValues("lightModeSecondary") || ""
                        ).isValid
                      ) {
                        appendVariableToBodyStyle({
                          value: getColorHslVariable("lightModeSecondary"),
                          variable: "secondary",
                        });
                      }
                    }

                    if (themeOption === "dark") {
                      if (
                        checkHexValidity(
                          form.getValues("darkModePrimary") || ""
                        ).isValid
                      ) {
                        appendVariableToBodyStyle({
                          value: getColorHslVariable("darkModePrimary"),
                          variable: "primary",
                        });
                      }

                      if (
                        checkHexValidity(
                          form.getValues("darkModeSecondary") || ""
                        ).isValid
                      ) {
                        appendVariableToBodyStyle({
                          value: getColorHslVariable("darkModeSecondary"),
                          variable: "secondary",
                        });
                      }
                    }

                    field.onChange(themeOption);
                    setTheme(themeOption, { noApllySystemVars: true });
                  }}
                  defaultValue={theme}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="light" />
                    </FormControl>
                    <FormLabel className="font-normal">Claro</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="dark" />
                    </FormControl>
                    <FormLabel className="font-normal">Escuro</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormDescription>Selecione seu modo preferido</FormDescription>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="lightModePrimary"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cor Primária Modo Claro</FormLabel>
                      <FormControl>
                        <div className="flex items-center space-x-2">
                          <Input
                            type="color"
                            {...field}
                            onChange={(e) => {
                              field.onChange(e);
                              if (theme === "light") {
                                appendVariableToBodyStyle({
                                  value: hexToCssHsl(e.target.value, true),
                                  variable: "primary",
                                });
                              }
                            }}
                            className="h-10 w-14 p-1"
                            slot=""
                          />
                          <div className="relative">
                            <Input
                              {...field}
                              onChange={(e) => {
                                field.onChange(e);
                                if (
                                  theme === "light" &&
                                  checkHexValidity(e.target.value).isValid
                                ) {
                                  appendVariableToBodyStyle({
                                    value: hexToCssHsl(e.target.value, true),
                                    variable: "primary",
                                  });
                                }
                              }}
                              placeholder="#ffffff"
                              className="flex-grow"
                            />
                            <Button
                              type="button"
                              size="sm"
                              className="absolute right-1 top-0 h-10"
                              onClick={() => {
                                form.setValue(
                                  "lightModePrimary",
                                  hslToHex(COLORS.light.primary)
                                );
                                if (theme === "light") {
                                  appendVariableToBodyStyle({
                                    value: hexToCssHsl(
                                      hslToHex(COLORS.light.primary),
                                      true
                                    ),
                                    variable: "primary",
                                  });
                                }
                              }}
                            >
                              <Redo2 className="h-4 w-4" />
                              <span className="sr-only">Search</span>
                            </Button>
                          </div>
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lightModeSecondary"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cor Secundária Modo Claro</FormLabel>
                      <FormControl>
                        <div className="flex items-center space-x-2">
                          <Input
                            type="color"
                            {...field}
                            className="h-10 w-14 p-1"
                            onChange={(e) => {
                              field.onChange(e);
                              if (theme === "light") {
                                appendVariableToBodyStyle({
                                  value: hexToCssHsl(e.target.value, true),
                                  variable: "secondary",
                                });
                              }
                            }}
                          />
                          <div className="relative">
                            <Input
                              {...field}
                              onChange={(e) => {
                                field.onChange(e);
                                if (
                                  theme === "light" &&
                                  checkHexValidity(e.target.value).isValid
                                ) {
                                  appendVariableToBodyStyle({
                                    value: hexToCssHsl(e.target.value, true),
                                    variable: "secondary",
                                  });
                                }
                              }}
                              placeholder="#f1f5f9"
                              className="flex-grow"
                            />
                            <Button
                              type="button"
                              size="sm"
                              className="absolute right-1 top-0 h-10"
                              onClick={() => {
                                form.setValue(
                                  "lightModeSecondary",
                                  hslToHex(COLORS.light.secondary)
                                );
                                if (theme === "light") {
                                  appendVariableToBodyStyle({
                                    value: hexToCssHsl(
                                      hslToHex(COLORS.light.secondary),
                                      true
                                    ),
                                    variable: "secondary",
                                  });
                                }
                              }}
                            >
                              <Redo2 className="h-4 w-4" />
                              <span className="sr-only">Search</span>
                            </Button>
                          </div>
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="darkModePrimary"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cor Primária Modo Escuro</FormLabel>
                      <FormControl>
                        <div className="flex items-center space-x-2">
                          <Input
                            type="color"
                            {...field}
                            className="h-10 w-14 p-1"
                            onChange={(e) => {
                              field.onChange(e);

                              if (theme === "dark") {
                                appendVariableToBodyStyle({
                                  value: hexToCssHsl(e.target.value, true),
                                  variable: "primary",
                                });
                              }
                            }}
                          />
                          <div className="relative">
                            <Input
                              {...field}
                              onChange={(e) => {
                                field.onChange(e);
                                if (
                                  theme === "dark" &&
                                  checkHexValidity(e.target.value).isValid
                                ) {
                                  appendVariableToBodyStyle({
                                    value: hexToCssHsl(e.target.value, true),
                                    variable: "primary",
                                  });
                                }
                              }}
                              placeholder="#1e293b"
                              className="flex-grow"
                            />
                            <Button
                              type="button"
                              size="sm"
                              className="absolute right-1 top-0 h-10"
                              onClick={() => {
                                form.setValue(
                                  "darkModePrimary",
                                  hslToHex(COLORS.dark.primary)
                                );
                                if (theme === "dark") {
                                  appendVariableToBodyStyle({
                                    value: hexToCssHsl(
                                      hslToHex(COLORS.dark.primary),
                                      true
                                    ),
                                    variable: "primary",
                                  });
                                }
                              }}
                            >
                              <Redo2 className="h-4 w-4" />
                              <span className="sr-only">Search</span>
                            </Button>
                          </div>
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="darkModeSecondary"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Dark Mode Secondary Color</FormLabel>
                      <FormControl>
                        <ChangeThemeColorInput
                          InputProps={{
                            ...field,
                            onChange: (e) => {
                              field.onChange(e);
                              if (
                                theme === "dark" &&
                                checkHexValidity(e.target.value).isValid
                              ) {
                                appendVariableToBodyStyle({
                                  value: hexToCssHsl(e.target.value, true),
                                  variable: "secondary",
                                });
                              }
                            },
                          }}
                          ResetButtonProps={{
                            onClick: () => {
                              form.setValue(
                                "darkModeSecondary",
                                hslToHex(COLORS.dark.secondary)
                              );
                              if (theme === "dark") {
                                appendVariableToBodyStyle({
                                  value: hexToCssHsl(
                                    hslToHex(COLORS.dark.secondary),
                                    true
                                  ),
                                  variable: "secondary",
                                });
                              }
                            },
                          }}
                          InputColorSelectorProps={{
                            ...field,
                            onChange: (e) => {
                              field.onChange(e);
                              if (theme === "dark") {
                                appendVariableToBodyStyle({
                                  value: hexToCssHsl(e.target.value, true),
                                  variable: "secondary",
                                });
                              }
                            },
                          }}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </FormItem>
          )}
        />
        {children}
      </form>
    </Form>
  );
}
