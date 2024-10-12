import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = cookies();
  try {
    const user = cookieStore.get("user");

    cookies().delete("user");
    cookies().delete("preferences");

    return Response.json(JSON.parse(user?.value || "{}"));
  } catch {
    return new Response(
      "Ocorreu um erro na tentativa de logout, por favor tente novamente",
      {
        status: 400,
      }
    );
  }
}
