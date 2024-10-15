import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { UserForm } from "./user-form";
import { useGetUserQuery, useUpdateUserMutation } from "../api/user";
import { ComponentProps } from "react";
import { edituserSchema } from "./user-schema";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";

interface EditUserDialogProps {
  DialogProps: ComponentProps<typeof Dialog>;
  onSuccessSubmit?: () => void;
}
export function EditUserDialog({
  DialogProps,
  onSuccessSubmit,
}: EditUserDialogProps) {
  const { data } = useGetUserQuery();
  const [updateUser, updateUserRequest] = useUpdateUserMutation();
  const { toast } = useToast();

  return (
    <Dialog {...DialogProps}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar Suas Informações</DialogTitle>
          <DialogDescription>
            Faça mudanças no seu perfil aqui.
          </DialogDescription>
        </DialogHeader>
        <UserForm
          schema={edituserSchema}
          onSubmit={async (values) => {
            const user = await updateUser({
              country: values.country,
              email: values.email,
              first_name: values.firstName,
              last_name: values.lastName,
              id: data?.id || "",
              password: values.password,
            });

            if (axios.isAxiosError(user.error)) {
              toast({
                title: "Ocorreu algum problema",
                description: user.error.response?.data,
                variant: "destructive",
              });

              return;
            }

            toast({
              title: "Dados atualizados com sucesso!",
            });

            onSuccessSubmit?.();
          }}
          defaultValues={{
            country: data?.country || "",
            email: data?.email || "",
            firstName: data?.first_name || "",
            lastName: data?.last_name || "",
            password: data?.password || "",
          }}
        >
          <DialogFooter>
            <Button type="submit" disabled={updateUserRequest.isLoading}>
              {!updateUserRequest.isLoading
                ? "Salvar alterações"
                : "Salvando alterações"}
            </Button>
          </DialogFooter>
        </UserForm>
      </DialogContent>
    </Dialog>
  );
}
