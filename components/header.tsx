"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "./toggle-theme";
import { useGetUserQuery, useLogoutMutation } from "@/features/auth/api/user";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { EditUserDialog } from "@/features/auth/components/edit-user-form";
import { useState } from "react";
import { UserPreferencesDialog } from "@/features/preferences/components/preferences-modal";
import { Button } from "./ui/button";

export function Header() {
  const [logout] = useLogoutMutation();
  const [isPreferencesDialogOpen, setIsPreferencesDialogOpen] = useState(false);

  const { toast } = useToast();

  const { push } = useRouter();

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data } = useGetUserQuery();

  const handleLogout = async () => {
    const res = await logout();
    if (axios.isAxiosError(res.error)) {
      toast({
        title: "Ocorreu algum problema",
        description: res.error.response?.data,
        variant: "destructive",
      });
      return;
    }
    push("/auth/login");
  };

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
      <UserPreferencesDialog
        DialogProps={{
          open: isPreferencesDialogOpen,
          onOpenChange: (open) => {
            setIsPreferencesDialogOpen(open);
          },
        }}
        onSuccessSubmit={() => {
          setIsPreferencesDialogOpen(false);
        }}
      />
      <header className="w-full px-4 lg:px-6 h-14 flex items-center bg-secondary">
        <div className="flex w-full justify-end md:justify-between items-center">
          <span className="text-lg font-bold text-primary hidden md:block">
            Verificador de Moedas
          </span>
          <div className="flex items-center gap-4">
            <ThemeToggle />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">{data?.first_name}</Button>
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
