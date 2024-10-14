import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PreferencesFormSchema, UserPreferencesForm } from "./preferences-form";
import { ComponentProps, PropsWithChildren } from "react";

interface UserPreferencesDialogProps {
  DialogProps: ComponentProps<typeof Dialog>;
  onSubmit: (formValues: PreferencesFormSchema) => void | Promise<void>;
  preferences?: PreferencesFormSchema;
}

export function UserPreferencesDialog({
  DialogProps,
  onSubmit,
  preferences,
  children,
}: PropsWithChildren<UserPreferencesDialogProps>) {
  return (
    <Dialog {...DialogProps}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Editar Preferências</DialogTitle>
          <DialogDescription>Mude suas preferencias aqui</DialogDescription>
        </DialogHeader>
        <UserPreferencesForm defaultValues={preferences} onSubmit={onSubmit}>
          <DialogFooter>{children}</DialogFooter>
        </UserPreferencesForm>
      </DialogContent>
    </Dialog>
  );
}

export type { PreferencesFormSchema } from "./preferences-form";
