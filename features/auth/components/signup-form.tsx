import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import * as z from "zod";
import { PropsWithChildren } from "react";
import { countriesptBr } from "@/lib/country";

const registerSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "Nome deve ter pelo menos 2 caracteres" }),
  lastName: z
    .string()
    .min(2, { message: "Sobrenome deve ter pelo menos 2 caracteres" }),
  country: z
    .string({ required_error: "Selecione um país" })
    .min(1, { message: "Selecione um país" }),
  email: z.string().email({ message: "Email inválido" }),
});

export type RegisterFormValues = z.infer<typeof registerSchema>;

interface SignupFormProps {
  onSubmit: (values: RegisterFormValues) => void;
}

export const SignupForm = ({
  onSubmit,
  children,
}: PropsWithChildren<SignupFormProps>) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<RegisterFormValues>({
    defaultValues: { country: undefined },
    resolver: zodResolver(registerSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="firstName">First Name</Label>
        <Input id="firstName" {...register("firstName")} />
        {errors.firstName && (
          <p className="text-sm text-destructive">{errors.firstName.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="lastName">Last Name</Label>
        <Input id="lastName" {...register("lastName")} />
        {errors.lastName && (
          <p className="text-sm text-destructive">{errors.lastName.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="country">Country</Label>
        <Select onValueChange={(value) => setValue("country", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione um país" />
          </SelectTrigger>
          <SelectContent>
            {countriesptBr.map((val) => {
              return (
                <SelectItem value={val.iso} key={val.iso}>
                  {val.name}
                </SelectItem>
              );
            })}
            <SelectItem value="us">United States</SelectItem>
            <SelectItem value="uk">United Kingdom</SelectItem>
            <SelectItem value="ca">Canada</SelectItem>
            <SelectItem value="au">Australia</SelectItem>
            {/* Add more countries as needed */}
          </SelectContent>
        </Select>
        {errors.country && (
          <p className="text-sm text-destructive">{errors.country.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" placeholder="m@example.com" {...register("email")} />
        {errors.email && (
          <p className="text-sm text-destructive">{errors.email.message}</p>
        )}
      </div>
      {children}
    </form>
  );
};
