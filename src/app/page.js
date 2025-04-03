import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();
  console.log("sss", session);

  return <div>Hii {session?.user?.name}</div>;
}
