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

import { PropsWithChildren } from "react";
import { countriesptBr } from "@/lib/country";
import { UserFormValues, UserSchema } from "./user-schema";

export interface UserFormProps {
  defaultValues?: UserFormValues;
  onSubmit: (values: UserFormValues) => void;
  mode?: "partial" | "required";
  schema: UserSchema;
}

export const UserForm = ({
  onSubmit,
  children,
  defaultValues,
  schema,
}: PropsWithChildren<UserFormProps>) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<UserFormValues>({
    defaultValues: { country: "", ...defaultValues },
    resolver: zodResolver(schema),
  });

  return (
    <form
      role="form"
      onSubmit={handleSubmit((data) => {
        onSubmit(data);
      })}
      className="space-y-4"
    >
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
        <Select
          defaultValue={getValues("country")}
          onValueChange={(value) => setValue("country", value)}
        >
          <SelectTrigger id="country">
            <SelectValue placeholder="Selecione um país" />
          </SelectTrigger>
          <SelectContent>
            {countriesptBr.map((val) => {
              return (
                <SelectItem data-testid={val.iso} value={val.iso} key={val.iso}>
                  {val.name}
                </SelectItem>
              );
            })}
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
      <div className="space-y-2">
        <Label htmlFor="password">Senha</Label>
        <Input
          id="password"
          placeholder="password1234"
          {...register("password")}
        />
        {errors.password && (
          <p className="text-sm text-destructive">{errors.password.message}</p>
        )}
      </div>
      {children}
    </form>
  );
};
