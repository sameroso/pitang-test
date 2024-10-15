import { UserDto } from "@/dtos/user";
import { changeTimeFromDaysToMilisecondsFromCurrentDate } from "@/lib/cookies";
import { userService } from "@/services/user-service";
import { cookies } from "next/headers";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } },
) {
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
    const body: UserDto = await request.json();

    const user = await userService.updateUser(
      params.id,
      removeFalsyElement(body),
    );

    const data = { ...user.data };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...rest } = data;

    cookieStorage.set("user", JSON.stringify(rest), {
      expires: changeTimeFromDaysToMilisecondsFromCurrentDate(10),
    });

    return Response.json(rest);
  } catch {
    return new Response("Ocorreu um erro, por favor tente novamente", {
      status: 400,
    });
  }
}
