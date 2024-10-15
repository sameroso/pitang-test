import { useLogoutMutation } from "@/features/auth/api/user";
import { useUpdatePreferencesMutation } from "@/features/preferences/api/preferences";
import { PreferencesFormSchema } from "@/features/preferences/components/preferences-form";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

interface SubmitPreferencesArgs {
  userId: string;
  onSuccessSubmit?: () => void;
  values?: PreferencesFormSchema;
}
export const useSubmitPreferences = () => {
  const [updatePreferences, updatePreferencesRequestInfo] =
    useUpdatePreferencesMutation();

  const { toast } = useToast();

  const onSubmitPreferences = useCallback(
    async (args: SubmitPreferencesArgs) => {
      const res = await updatePreferences({
        id: args.userId,
        primary_color: {
          dark: args?.values?.darkModePrimary || "",
          light: args?.values?.lightModePrimary || "",
        },
        secondary_color: {
          dark: args?.values?.darkModeSecondary || "",
          light: args?.values?.lightModeSecondary || "",
        },
        mode: args?.values?.preferredMode || "",
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
        title: "Preferencias atualizadas com sucesso!",
      });
      args?.onSuccessSubmit?.();
    },
    [toast, updatePreferences]
  );

  return { onSubmitPreferences, updatePreferencesRequestInfo };
};

export const useLogout = () => {
  const [logout] = useLogoutMutation();
  const { toast } = useToast();

  const { push } = useRouter();

  const handleLogout = useCallback(async () => {
    const res = await logout();
    if (axios.isAxiosError(res.error)) {
      toast({
        title: "Ocorreu algum problema",
        description: res.error.response?.data,
        variant: "destructive",
      });
      return;
    }
    push("/auth/login");
  }, [logout, push, toast]);

  return { handleLogout };
};
