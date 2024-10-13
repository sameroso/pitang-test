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
import { useTheme } from "next-themes";
import { hexToCssHsl } from "@/style/utils";
import { PropsWithChildren } from "react";

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
  const { setTheme, theme } = useTheme();

  const form = useForm<PreferencesFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="preferredMode"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Preferred Mode</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={(themeOption) => {
                    if (themeOption === "light") {
                      document!
                        .querySelector("html")!
                        .attributeStyleMap.set(
                          "--primary",
                          hexToCssHsl(
                            form.getValues("lightModePrimary") ||
                              defaultValues?.lightModePrimary ||
                              "",
                            true
                          )
                        );

                      document!
                        .querySelector("html")!
                        .attributeStyleMap.set(
                          "--secondary",
                          hexToCssHsl(
                            form.getValues("lightModeSecondary") ||
                              defaultValues?.lightModeSecondary ||
                              "",
                            true
                          )
                        );
                    }

                    if (themeOption === "dark") {
                      document!
                        .querySelector("html")!
                        .attributeStyleMap.set(
                          "--primary",
                          hexToCssHsl(
                            form.getValues("darkModePrimary") ||
                              defaultValues?.darkModePrimary ||
                              "",
                            true
                          )
                        );

                      document!
                        .querySelector("html")!
                        .attributeStyleMap.set(
                          "--secondary",
                          hexToCssHsl(
                            form.getValues("darkModeSecondary") ||
                              defaultValues?.darkModeSecondary ||
                              "",
                            true
                          )
                        );
                    }

                    field.onChange(themeOption);
                    setTheme(themeOption);
                  }}
                  defaultValue={theme}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="light" />
                    </FormControl>
                    <FormLabel className="font-normal">Light</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="dark" />
                    </FormControl>
                    <FormLabel className="font-normal">Dark</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormDescription>
                Select your preferred color mode.
              </FormDescription>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="lightModePrimary"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Light Primary Color</FormLabel>
                      <FormControl>
                        <div className="flex items-center space-x-2">
                          <Input
                            type="color"
                            {...field}
                            onChange={(e) => {
                              field.onChange(e);

                              if (theme === "light") {
                                document!
                                  .querySelector("html")!
                                  .attributeStyleMap.set(
                                    "--primary",
                                    hexToCssHsl(e.target.value, true)
                                  );
                              }
                            }}
                            className="h-10 w-14 p-1"
                          />
                          <Input
                            {...field}
                            placeholder="#ffffff"
                            className="flex-grow"
                          />
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
                      <FormLabel>Light Secondary Color</FormLabel>
                      <FormControl>
                        <div className="flex items-center space-x-2">
                          <Input
                            type="color"
                            {...field}
                            className="h-10 w-14 p-1"
                            onChange={(e) => {
                              field.onChange(e);
                              if (theme === "light") {
                                document!
                                  .querySelector("html")!
                                  .attributeStyleMap.set(
                                    "--secondary",
                                    hexToCssHsl(e.target.value, true)
                                  );
                              }
                            }}
                          />
                          <Input
                            {...field}
                            placeholder="#f1f5f9"
                            className="flex-grow"
                          />
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
                      <FormLabel>Dark Mode Primary Color</FormLabel>
                      <FormControl>
                        <div className="flex items-center space-x-2">
                          <Input
                            type="color"
                            {...field}
                            className="h-10 w-14 p-1"
                            onChange={(e) => {
                              field.onChange(e);

                              if (theme === "dark") {
                                document!
                                  .querySelector("html")!
                                  .attributeStyleMap.set(
                                    "--primary",
                                    hexToCssHsl(e.target.value, true)
                                  );
                              }
                            }}
                          />
                          <Input
                            {...field}
                            placeholder="#1e293b"
                            className="flex-grow"
                          />
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
                        <div className="flex items-center space-x-2">
                          <Input
                            type="color"
                            {...field}
                            className="h-10 w-14 p-1"
                            onChange={(e) => {
                              field.onChange(e);
                              if (theme === "dark") {
                                document!
                                  .querySelector("html")!
                                  .attributeStyleMap.set(
                                    "--secondary",
                                    hexToCssHsl(e.target.value, true)
                                  );
                              }
                            }}
                          />
                          <Input
                            {...field}
                            placeholder="#334155"
                            className="flex-grow"
                          />
                        </div>
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
