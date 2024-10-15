import * as z from "zod";

export const createUserSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "Nome deve ter pelo menos 2 caracteres" }),
  lastName: z
    .string()
    .min(2, { message: "Sobrenome deve ter pelo menos 2 caracteres" }),
  country: z.string().min(1, { message: "É necesário selecionar um país" }),
  email: z.string().email({ message: "Email inválido" }),
  password: z
    .string()
    .min(8, { message: "Senha precisa conter no mínimo 8 caracteres" }),
});

export type CreateUserFormSchema = z.infer<typeof createUserSchema>;

export const edituserSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "Nome deve ter pelo menos 2 caracteres" })
    .or(z.literal("")),
  lastName: z
    .string()
    .min(2, { message: "Sobrenome deve ter pelo menos 2 caracteres" })
    .or(z.literal("")),
  country: z
    .string({ required_error: "Selecione um país" })
    .min(1, { message: "Selecione um país" })
    .or(z.literal("")),
  email: z.string().email({ message: "Email inválido" }).or(z.literal("")),
  password: z
    .string()
    .min(8, { message: "Senha precisa conter no mínimo 8 caracteres" })
    .or(z.literal("")),
});

export type EditUserFormSchema = z.infer<typeof edituserSchema>;

export type UserSchema = typeof createUserSchema | typeof edituserSchema;

export type UserFormValues = CreateUserFormSchema | EditUserFormSchema;
