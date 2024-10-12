"use client";

import { Button } from "@/components/ui/button";

import { CardContent, CardFooter } from "@/components/ui/card";

import { useToast } from "@/hooks/use-toast";
import { ThemeToggle } from "@/components/toggle-theme";
import axios from "axios";
import {
  RegisterFormValues,
  SignupForm,
} from "@/features/auth/components/signup-form";
import { useSignUpMutation } from "@/features/auth/api/user";
import { AuthCard } from "@/features/auth/components/auth-card";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterTemplate() {
  const { toast } = useToast();

  const [signup, signupData] = useSignUpMutation();
  const { push } = useRouter();

  const onSubmit = async (data: RegisterFormValues) => {
    const res = await signup({
      country: data.country,
      email: data.email,
      first_name: data.firstName,
      last_name: data.lastName,
      password: data.password,
    });

    if (axios.isAxiosError(res.error)) {
      toast({
        title: "Ocorreu algum problema",
        description: res.error.response?.data,
        variant: "destructive",
      });

      return;
    }

    toast({
      title: "Cadastro feito com sucesso",
      description: `Bem vindo, ${res.data?.first_name}!`,
    });
    push("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <AuthCard title="Registrar" description="Crie sua conta para começar">
        <CardContent>
          <SignupForm onSubmit={onSubmit}>
            <Button
              type="submit"
              className="w-full"
              disabled={signupData.isLoading}
            >
              {signupData.isLoading ? "Registering..." : "Register"}
            </Button>
          </SignupForm>
        </CardContent>
        <CardFooter className="flex justify-between">
          <ThemeToggle />
          <Link href="/auth/login">
            <Button variant="link">Já tem uma conta?</Button>
          </Link>
        </CardFooter>
      </AuthCard>
    </div>
  );
}
