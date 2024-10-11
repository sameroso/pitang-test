"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";

import { CardContent, CardFooter } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ThemeToggle } from "@/components/toggle-theme";
import { AuthCard } from "./auth-card";
import { LoginForm, LoginFormValues } from "./login-form";

export default function LoginPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: LoginFormValues) => {
    console.log({ data });
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
    toast({
      title: "Login Successful",
      description: `Welcome back, ${data.email}!`,
      variant: "destructive",
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
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
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
