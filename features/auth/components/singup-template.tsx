"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

import { CardContent, CardFooter } from "@/components/ui/card";

import { useToast } from "@/hooks/use-toast";
import { ThemeToggle } from "@/components/toggle-theme";
import { AuthCard } from "./auth-card";
import { RegisterFormValues, SignupForm } from "./signup-form";

export default function RegisterTemplate() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: RegisterFormValues) => {
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
    toast({
      title: "Registration Successful",
      description: `Welcome, ${data.firstName} ${data.lastName}!`,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <AuthCard title="Registrar" description="Crie sua conta para começar">
        <CardContent>
          <SignupForm onSubmit={onSubmit}>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Registering..." : "Register"}
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
