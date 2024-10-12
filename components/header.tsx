"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "./toggle-theme";
import { useLogoutMutation } from "@/features/auth/api/user";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { EditUserDialog } from "@/features/auth/components/edit-user-form";
import { useState } from "react";

export function Header() {
  const [logout] = useLogoutMutation();

  const { toast } = useToast();

  const { push } = useRouter();

  const [isDialogOpen, setIsDialogOpen] = useState(false);

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
      <header className="w-full px-4 lg:px-6 h-14 flex items-center">
        <div className="flex w-full justify-between items-center">
          <span className="text-lg font-bold">My App</span>
          <div className="flex items-center gap-4">
            <ThemeToggle />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="h-9 w-9 cursor-pointer">
                  <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
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
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
    </>
  );
}
