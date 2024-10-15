"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { hslToHex } from "@/style/utils";
import { PropsWithChildren } from "react";
import { COLORS } from "@/style/constants";
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
  onSubmit: (values: PreferencesFormSchema) => void | Promise<void>;
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
      preferredMode: defaultValues?.preferredMode || "",
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

  const changeTheme = (args: {
    primary?: { dark?: string; light?: string };
    secondary?: { dark?: string; light?: string };
    mode?: string;
  }) => {
    setTheme({
      primary_color: {
        dark: args?.primary?.dark || form.getValues("darkModePrimary"),
        light: args?.primary?.light || form.getValues("lightModePrimary"),
      },
      secondary_color: {
        light: args?.secondary?.light || form.getValues("lightModeSecondary"),
        dark: args?.secondary?.dark || form.getValues("darkModeSecondary"),
      },
      mode: args.mode,
    });
  };

  return (
    <Form {...form}>
      <form
        role="form"
        onSubmit={form.handleSubmit((data) => {
          onSubmit(data);
        })}
        className="space-y-8"
      >
        <FormField
          control={form.control}
          name="preferredMode"
          render={({ field }) => (
            <FormItem className="space-y-5">
              <FormLabel>Modo preferido</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={(themeOption) => {
                    field.onChange(themeOption);
                    changeTheme({
                      mode: themeOption,
                      primary: {
                        dark: form.getValues("darkModePrimary"),
                        light: form.getValues("lightModePrimary"),
                      },
                      secondary: {
                        dark: form.getValues("darkModeSecondary"),
                        light: form.getValues("lightModeSecondary"),
                      },
                    });
                  }}
                  defaultValue={defaultValues?.preferredMode || theme}
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
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="lightModePrimary"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="primary-light-mode-input">
                        Cor Primária Modo Claro
                      </FormLabel>
                      <FormControl>
                        <ChangeThemeColorInput
                          InputProps={{
                            ...field,
                            id: "primary-light-mode-input",
                            onChange: (e) => {
                              field.onChange(e);
                              changeTheme({
                                primary: {
                                  light: e.target.value,
                                },
                              });
                            },
                          }}
                          InputColorSelectorProps={{
                            ...field,
                            onChange: (e) => {
                              field.onChange(e);
                              changeTheme({
                                primary: { light: e.target.value },
                              });
                            },
                          }}
                          ResetButtonProps={{
                            onClick: () => {
                              form.setValue(
                                "lightModePrimary",
                                hslToHex(COLORS.light.primary)
                              );

                              changeTheme({
                                primary: {
                                  light: hslToHex(COLORS.light.primary),
                                },
                              });
                            },
                          }}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lightModeSecondary"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="secondary-light-mode-input">
                        Cor Secundária Modo Claro
                      </FormLabel>
                      <FormControl>
                        <ChangeThemeColorInput
                          InputColorSelectorProps={{
                            ...field,
                            onChange: (e) => {
                              field.onChange(e);
                              changeTheme({
                                secondary: { light: e.target.value },
                              });
                            },
                          }}
                          InputProps={{
                            ...field,
                            id: "secondary-light-mode-input",
                            onChange: (e) => {
                              field.onChange(e);
                              changeTheme({
                                secondary: { light: e.target.value },
                              });
                            },
                          }}
                          ResetButtonProps={{
                            onClick: () => {
                              form.setValue(
                                "lightModeSecondary",
                                hslToHex(COLORS.light.secondary)
                              );
                              changeTheme({
                                secondary: {
                                  light: hslToHex(COLORS.light.secondary),
                                },
                              });
                            },
                          }}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="darkModePrimary"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="primary-dark-mode-input">
                        Cor Primária Modo Escuro
                      </FormLabel>
                      <FormControl>
                        <ChangeThemeColorInput
                          InputProps={{
                            ...field,
                            id: "primary-dark-mode-input",
                            onChange: (e) => {
                              field.onChange(e);
                              changeTheme({
                                primary: { dark: e.target.value },
                              });
                            },
                          }}
                          InputColorSelectorProps={{
                            ...field,
                            onChange: (e) => {
                              field.onChange(e);
                              changeTheme({
                                primary: { dark: e.target.value },
                              });
                            },
                          }}
                          ResetButtonProps={{
                            onClick: () => {
                              form.setValue(
                                "darkModePrimary",
                                hslToHex(COLORS.dark.primary)
                              );
                              changeTheme({
                                primary: {
                                  dark: hslToHex(COLORS.dark.primary),
                                },
                              });
                            },
                          }}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="darkModeSecondary"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="secondary-dark-mode-input">
                        Cor Secundária Modo Escuro
                      </FormLabel>
                      <FormControl>
                        <ChangeThemeColorInput
                          InputProps={{
                            ...field,
                            id: "secondary-dark-mode-input",
                            onChange: (e) => {
                              field.onChange(e);
                              changeTheme({
                                secondary: {
                                  dark: e.target.value,
                                },
                              });
                            },
                          }}
                          ResetButtonProps={{
                            onClick: () => {
                              form.setValue(
                                "darkModeSecondary",
                                hslToHex(COLORS.dark.secondary)
                              );
                              changeTheme({
                                secondary: {
                                  dark: hslToHex(COLORS.dark.secondary),
                                },
                              });
                            },
                          }}
                          InputColorSelectorProps={{
                            ...field,
                            onChange: (e) => {
                              field.onChange(e);
                              changeTheme({
                                secondary: {
                                  dark: e.target.value,
                                },
                              });
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
