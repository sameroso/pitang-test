"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "../toggle-theme";
import { useGetUserQuery } from "@/features/auth/api/user";
import { EditUserDialog } from "@/features/auth/components/edit-user-form";
import { useState } from "react";
import { Button } from "../ui/button";
import { useGetPreferencesQuery } from "@/features/preferences/api/preferences";
import { useLogout, useSubmitPreferences } from "./hooks";
import { SimpleDialog } from "../simple-dialog";
import { UserPreferencesForm } from "@/features/preferences/components/preferences-form";
import { DialogFooter } from "../ui/dialog";

export function Header() {
  const { handleLogout } = useLogout();
  const [isPreferencesDialogOpen, setIsPreferencesDialogOpen] = useState(false);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data: userData } = useGetUserQuery();

  const { onSubmitPreferences, updatePreferencesRequestInfo } =
    useSubmitPreferences();

  const { data: preferencesData } = useGetPreferencesQuery();

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

  return (
    <>
      <EditUserDialog
        DialogProps={{
          open: isDialogOpen,
          onOpenChange: (open) => {
            setIsDialogOpen(open);
          },
        }}
        onSuccessSubmit={() => {
          setIsDialogOpen(false);
        }}
      />
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
                <DropdownMenuItem onClick={handleLogout}>
                  Logout
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    setIsDialogOpen(true);
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
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
    </>
  );
}
