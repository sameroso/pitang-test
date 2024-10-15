import { changeTimeFromDaysToMilisecondsFromCurrentDate } from "@/lib/cookies";
import { userPreferencesService } from "@/services/user-preferences-service";
import { userService } from "@/services/user-service";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const cookieStorage = cookies();
  try {
    const body = await request.json();

    const user = await userService.getUserByEmail(body.email);

    if (user?.data?.length > 0) {
      return new Response("Usuário já cadastrado", { status: 400 });
    }

    const res = await userService.createUser(body);
    const settings = await userPreferencesService.create({
      user_id: res.data.id,
    });

    const data = { ...res.data };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...rest } = data;

    cookieStorage.set("user", JSON.stringify(rest), {
      expires: changeTimeFromDaysToMilisecondsFromCurrentDate(10),
    });

    cookieStorage.set("preferences", JSON.stringify(settings.data), {
      expires: changeTimeFromDaysToMilisecondsFromCurrentDate(10),
    });

    return Response.json(rest);
  } catch {
    return new Response("Ocorreu um erro, por favor tente novamente", {
      status: 400,
    });
  }
}
