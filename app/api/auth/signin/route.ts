import { dbApi } from "@/http/dbApi";
import { UserService } from "@/services/user-service";
import { cookies } from "next/headers";
import { changeTimeFromDaysToMilisecondsFromCurrentDate } from "@/lib/cookies";
import { SettingsService } from "@/services/user-preferences-service";

export async function POST(request: Request) {
  const cookieStorage = cookies();

  try {
    const body = await request.json();

    const res = await UserService.create(dbApi).getUserByEmail(body.email);

    if (res.data.length === 0) {
      return new Response("Email não encontrado", { status: 400 });
    }

    if (res.data[0].password !== body.password) {
      return new Response("Senha inválida", { status: 400 });
    }

    const data = { ...res.data[0] };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...rest } = data;

    const settingsService = SettingsService.create(dbApi);

    const settings = await settingsService.getUserSettingsByUserId(
      res?.data?.[0].id
    );

    cookieStorage.set("user", JSON.stringify(rest), {
      expires: changeTimeFromDaysToMilisecondsFromCurrentDate(10),
    });

    cookieStorage.set("preferences", JSON.stringify(settings.data[0]), {
      expires: changeTimeFromDaysToMilisecondsFromCurrentDate(10),
    });

    return Response.json(rest);
  } catch {
    return new Response("Ocorreu um erro, por favor tente novamente", {
      status: 400,
    });
  }
}
