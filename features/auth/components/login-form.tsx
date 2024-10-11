import * as z from "zod";
import { PasswordInput } from "@/components/password-input";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PropsWithChildren } from "react";

const loginSchema = z.object({
  email: z.string().email({ message: "Email Inválido" }),
  password: z
    .string()
    .min(8, { message: "Senha precisa conter no mínimo 8 caracteres" }),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

interface LoginFormProps {
  onSubmit: (values: LoginFormValues) => void;
}

export const LoginForm = ({
  onSubmit,
  children,
}: PropsWithChildren<LoginFormProps>) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  return (
    <form
      onSubmit={(e) => {
        handleSubmit((data) => {
          onSubmit({ email: data.email, password: data.password });
        })(e);
      }}
      className="space-y-4"
      aria-label="form"
    >
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          autoComplete="username"
          placeholder="m@example.com"
          {...register("email")}
        />
        {errors.email && (
          <p className="text-sm text-destructive">{errors.email.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <PasswordInput {...register("password")} />
        {errors.password && (
          <p className="text-sm text-destructive">{errors.password.message}</p>
        )}
      </div>
      {children}
    </form>
  );
};
