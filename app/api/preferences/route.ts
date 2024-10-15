import { PreferencesDto } from "@/dtos/user";
import { changeTimeFromDaysToMilisecondsFromCurrentDate } from "@/lib/cookies";
import { userPreferencesService } from "@/services/user-preferences-service";
import { cookies } from "next/headers";

export async function PATCH(request: Request) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const removeFalsyElement = <TRecord extends Record<string, any>>(
    object: TRecord,
  ) => {
    const parsedRecord = Object.entries(object).reduce((acc, cur) => {
      if (!!cur[1]) {
        return { ...acc, [cur[0]]: cur[1] };
      }
      return acc;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }, {} as any) as Partial<TRecord>;
    return parsedRecord;
  };

  const cookieStorage = cookies();
  try {
    const body: Partial<PreferencesDto> = await request.json();
    const { id, ...rest } = body;

    const preferences = await userPreferencesService.update(
      id || "",
      removeFalsyElement(rest),
    );

    cookieStorage.set("preferences", JSON.stringify(preferences.data), {
      expires: changeTimeFromDaysToMilisecondsFromCurrentDate(10),
    });

    return Response.json(preferences.data);
  } catch {
    return new Response("Ocorreu um erro, por favor tente novamente", {
      status: 400,
    });
  }
}
