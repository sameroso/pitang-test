import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PreferencesFormSchema, UserPreferencesForm } from "./preferences-form";
import { ComponentProps } from "react";
import {
  useGetPreferencesQuery,
  useUpdatePreferencesMutation,
} from "../api/preferences";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";

interface UserPreferencesDialogProps {
  DialogProps: ComponentProps<typeof Dialog>;
  onSuccessSubmit?: () => void;
}

export function UserPreferencesDialog({
  DialogProps,
  onSuccessSubmit,
}: UserPreferencesDialogProps) {
  const { data } = useGetPreferencesQuery();
  const [updatePreferences, updatePreferencesRequestStatus] =
    useUpdatePreferencesMutation();
  const { toast } = useToast();

  const onSubmit = async (values: PreferencesFormSchema) => {
    const res = await updatePreferences({
      id: data?.id || "",
      primary_color: {
        dark: values.darkModePrimary || "",
        light: values.lightModePrimary || "",
      },
      secondary_color: {
        dark: values?.darkModeSecondary || "",
        light: values.lightModeSecondary || "",
      },
      mode: values.preferredMode || "",
    });

    if (axios.isAxiosError(res.error)) {
      toast({
        title: "ocorreu um erro!",
        variant: "destructive",
        description: res.error.response?.data,
      });

      return;
    }
    toast({
      title: "Valores atualizados com sucesso!",
    });
    onSuccessSubmit?.();
  };

  return (
    <Dialog {...DialogProps}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Editar Preferências</DialogTitle>
          <DialogDescription>Mude suas preferencias aqui</DialogDescription>
        </DialogHeader>
        <UserPreferencesForm
          defaultValues={{
            preferredMode: data?.mode as "dark" | "light" | "" | undefined,
            lightModePrimary: data?.primary_color?.light,
            lightModeSecondary: data?.secondary_color?.light,
            darkModePrimary: data?.primary_color?.dark,
            darkModeSecondary: data?.secondary_color?.dark,
          }}
          onSubmit={onSubmit}
        >
          <DialogFooter>
            <Button type="submit">
              {updatePreferencesRequestStatus.isLoading ? "Salvando" : "Salvar"}
            </Button>
          </DialogFooter>
        </UserPreferencesForm>
      </DialogContent>
    </Dialog>
  );
}
