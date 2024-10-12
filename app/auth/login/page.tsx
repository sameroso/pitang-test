"use client";

import { Button } from "@/components/ui/button";

import { CardContent, CardFooter } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ThemeToggle } from "@/components/toggle-theme";
import axios from "axios";
import { useSignInMutation } from "@/features/auth/api/user";
import {
  LoginForm,
  LoginFormValues,
} from "@/features/auth/components/login-form";
import { AuthCard } from "@/features/auth/components/auth-card";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const { toast } = useToast();

  const [signIn, data] = useSignInMutation();

  const { push } = useRouter();

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
    push("/");
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
          <Link href="/auth/signup">
            <Button variant="link">Não tem uma conta?</Button>
          </Link>
        </CardFooter>
      </AuthCard>
    </div>
  );
}
