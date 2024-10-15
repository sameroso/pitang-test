import {
  useLogoutMutation,
  useUpdateUserMutation,
} from "@/features/auth/api/user";
import { EditUserFormSchema } from "@/features/auth/components/user-schema";
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

interface SubmitUserArgs {
  userId: string;
  onSuccessSubmit?: () => void;
  values?: EditUserFormSchema;
}
export const useSubmitUser = () => {
  const [updateUser, updateUserRequestInfo] = useUpdateUserMutation();

  const { toast } = useToast();

  const onSubmitUser = useCallback(
    async (args: SubmitUserArgs) => {
      const user = await updateUser({
        country: args?.values?.country || "",
        email: args?.values?.email || "",
        first_name: args?.values?.firstName || "",
        last_name: args?.values?.lastName || "",
        id: args?.userId,
        password: args?.values?.password || "",
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

      args?.onSuccessSubmit?.();
    },
    [toast, updateUser]
  );

  return { onSubmitUser, updateUserRequestInfo };
};
