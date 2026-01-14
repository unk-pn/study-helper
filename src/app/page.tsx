import { SuggestSubject } from "@/features/home/components";
import c from "./page.module.css";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { GuestHome } from "@/features/guest/components";

export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <div className={c.page}>
      {session ? (
        <>
          <SuggestSubject />
        </>
      ) : (
        <>
          <GuestHome />
        </>
      )}
    </div>
  );
}
