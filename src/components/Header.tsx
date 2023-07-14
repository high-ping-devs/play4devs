import { useUser } from "@auth0/nextjs-auth0/client";
import UserProfileImage from "./UserProfileImage";
import { Roboto_Mono } from "next/font/google";
const roboto = Roboto_Mono({ subsets: ["latin"] });

export default function Header() {
  const { user } = useUser();

  if (user) {
    return (
      <header className="flex justify-between py-3 px-3 border-b-2 tabletL:justify-center tabletL:gap-[700px]">
        <a
          href="/"
          className="self-end font-medium font-sans text-base"
          style={{ fontFamily: roboto.style.fontFamily }}
        >
          play4devs
        </a>
        <a href="/profile">
          <UserProfileImage width={50} />
        </a>
      </header>
    );
  } else {
    return <></>;
  }
}
