"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "../toggle-theme";
import { useGetUserQuery } from "@/features/auth/api/user";
import { useState } from "react";
import { Button } from "../ui/button";
import { useGetPreferencesQuery } from "@/features/preferences/api/preferences";
import { useLogout, useSubmitPreferences, useSubmitUser } from "./hooks";
import { SimpleDialog } from "../simple-dialog";
import { UserPreferencesForm } from "@/features/preferences/components/preferences-form";
import { DialogFooter } from "../ui/dialog";
import { UserForm } from "@/features/auth/components/user-form";
import { edituserSchema } from "@/features/auth/components/user-schema";

export function Header() {
  const { handleLogout } = useLogout();
  const [isPreferencesDialogOpen, setIsPreferencesDialogOpen] = useState(false);

  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false);

  const { data: userData } = useGetUserQuery();

  const { onSubmitPreferences, updatePreferencesRequestInfo } =
    useSubmitPreferences();

  const { data: preferencesData } = useGetPreferencesQuery();

  const { onSubmitUser, updateUserRequestInfo } = useSubmitUser();

  const PreferencesDialog = (
    <SimpleDialog
      DialogProps={{
        open: isPreferencesDialogOpen,
        onOpenChange: (open) => {
          setIsPreferencesDialogOpen(open);
        },
      }}
      title="Editar Preferências"
      description="Mude suas preferencias aqui"
    >
      <UserPreferencesForm
        defaultValues={{
          preferredMode: preferencesData?.mode as
            | "dark"
            | "light"
            | ""
            | undefined,
          lightModePrimary: preferencesData?.primary_color?.light,
          lightModeSecondary: preferencesData?.secondary_color?.light,
          darkModePrimary: preferencesData?.primary_color?.dark,
          darkModeSecondary: preferencesData?.secondary_color?.dark,
        }}
        onSubmit={(values) => {
          onSubmitPreferences({
            userId: preferencesData?.id || "",
            values,
            onSuccessSubmit() {
              setIsPreferencesDialogOpen(false);
            },
          });
        }}
      >
        <DialogFooter>
          <Button type="submit">
            {updatePreferencesRequestInfo.isLoading ? "Salvando" : "Salvar"}
          </Button>
        </DialogFooter>
      </UserPreferencesForm>
    </SimpleDialog>
  );

  const EditUserDialog = (
    <SimpleDialog
      DialogProps={{
        open: isUserDialogOpen,
        onOpenChange: (open) => {
          setIsUserDialogOpen(open);
        },
      }}
      title="Editar Suas Informações"
      description="Faça mudanças no seu perfil aqui"
    >
      <UserForm
        schema={edituserSchema}
        onSubmit={(values) =>
          onSubmitUser({
            values,
            userId: userData?.id || "",
            onSuccessSubmit: () => {
              setIsUserDialogOpen(false);
            },
          })
        }
        defaultValues={{
          country: userData?.country || "",
          email: userData?.email || "",
          firstName: userData?.first_name || "",
          lastName: userData?.last_name || "",
          password: userData?.password || "",
        }}
      >
        <DialogFooter>
          <Button type="submit" disabled={updateUserRequestInfo.isLoading}>
            {!updateUserRequestInfo.isLoading
              ? "Salvar alterações"
              : "Salvando alterações"}
          </Button>
        </DialogFooter>
      </UserForm>
    </SimpleDialog>
  );

  return (
    <>
      {EditUserDialog}
      {PreferencesDialog}
      <header className="w-full px-4 lg:px-6 h-14 flex items-center bg-secondary">
        <div className="flex w-full justify-end md:justify-between items-center">
          <span className="text-lg font-bold text-primary hidden md:block">
            Verificador de Moedas
          </span>
          <div className="flex items-center gap-4">
            <ThemeToggle />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">{userData?.first_name}</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() => {
                    setIsUserDialogOpen(true);
                  }}
                >
                  Editar Usuário
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    setIsPreferencesDialogOpen(true);
                  }}
                >
                  Editar Preferências
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
    </>
  );
}
