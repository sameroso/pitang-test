"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "../toggle-theme";
import {
  useGetUserQuery,
  useUpdateUserMutation,
} from "@/features/auth/api/user";
import { useState } from "react";
import { Button } from "../ui/button";
import { useGetPreferencesQuery } from "@/features/preferences/api/preferences";
import { useLogout, useSubmitPreferences } from "./hooks";
import { SimpleDialog } from "../simple-dialog";
import { UserPreferencesForm } from "@/features/preferences/components/preferences-form";
import { DialogFooter } from "../ui/dialog";
import { UserForm } from "@/features/auth/components/user-form";
import { edituserSchema } from "@/features/auth/components/user-schema";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";

export function Header() {
  const { handleLogout } = useLogout();
  const [isPreferencesDialogOpen, setIsPreferencesDialogOpen] = useState(false);

  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false);

  const { data: userData } = useGetUserQuery();

  const { onSubmitPreferences, updatePreferencesRequestInfo } =
    useSubmitPreferences();

  const { data: preferencesData } = useGetPreferencesQuery();

  const [updateUser, updateUserRequest] = useUpdateUserMutation();

  const { toast } = useToast();

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
        onSubmit={async (values) => {
          const user = await updateUser({
            country: values.country,
            email: values.email,
            first_name: values.firstName,
            last_name: values.lastName,
            id: userData?.id || "",
            password: values.password,
          });

          if (axios.isAxiosError(user.error)) {
            toast({
              title: "Ocorreu algum problema",
              description: user.error.response?.data,
              variant: "destructive",
            });

            return;
          }

          toast({
            title: "Dados atualizados com sucesso!",
          });

          setIsUserDialogOpen(false);
        }}
        defaultValues={{
          country: userData?.country || "",
          email: userData?.email || "",
          firstName: userData?.first_name || "",
          lastName: userData?.last_name || "",
          password: userData?.password || "",
        }}
      >
        <DialogFooter>
          <Button type="submit" disabled={updateUserRequest.isLoading}>
            {!updateUserRequest.isLoading
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
                <DropdownMenuItem onClick={handleLogout}>
                  Logout
                </DropdownMenuItem>
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
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
    </>
  );
}
