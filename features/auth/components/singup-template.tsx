"use client";

import { Button } from "@/components/ui/button";

import { CardContent, CardFooter } from "@/components/ui/card";

import { useToast } from "@/hooks/use-toast";
import { ThemeToggle } from "@/components/toggle-theme";
import { AuthCard } from "./auth-card";
import { RegisterFormValues, SignupForm } from "./signup-form";
import { useSignUpMutation } from "../api/user";
import axios from "axios";

export default function RegisterTemplate() {
  const { toast } = useToast();

  const [signup, signupData] = useSignUpMutation();

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
          <Button variant="link">Already have an account?</Button>
        </CardFooter>
      </AuthCard>
    </div>
  );
}
