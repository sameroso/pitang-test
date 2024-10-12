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

export function Header() {
  const [logout] = useLogoutMutation();

  const { toast } = useToast();

  const { push } = useRouter();

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
              <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
