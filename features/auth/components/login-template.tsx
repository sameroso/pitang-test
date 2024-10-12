"use client";

import { Button } from "@/components/ui/button";

import { CardContent, CardFooter } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ThemeToggle } from "@/components/toggle-theme";
import { AuthCard } from "./auth-card";
import { LoginForm, LoginFormValues } from "./login-form";
import { useSignInMutation } from "../api/user";
import axios from "axios";

export default function LoginPage() {
  const { toast } = useToast();

  const [signIn, data] = useSignInMutation();

  const onSubmit = async (data: LoginFormValues) => {
    const res = await signIn(data);

    if (axios.isAxiosError(res.error)) {
      toast({
        title: "Ocorreu algum problema",
        description: res.error.response?.data,
        variant: "destructive",
      });

      return;
    }

    toast({
      title: "Login feito com sucesso",
      description: `Bem vindo de volta, ${res.data?.first_name}!`,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <AuthCard
        title="Login"
        description="Accesse sua conta colocando suas credenciais"
      >
        <CardContent>
          <LoginForm onSubmit={onSubmit}>
            <Button type="submit" className="w-full" disabled={data.isLoading}>
              {data.isLoading ? "Logging in..." : "Login"}
            </Button>
          </LoginForm>
        </CardContent>
        <CardFooter className="flex justify-between">
          <ThemeToggle />
          <Button variant="link">Não tem uma conta?</Button>
        </CardFooter>
      </AuthCard>
    </div>
  );
}
