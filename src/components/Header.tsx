import { useUser } from "@auth0/nextjs-auth0/client";
import UserProfileImage from "./UserProfileImage";

export default function Header() {
  const { user } = useUser();

  if (user) {
    return (
      <header className="flex justify-between py-3 px-3 mb-5 border-b-2">
        <span className="self-center font-medium">{user.name}</span>
        <a href="/profile">
          <UserProfileImage width={50} />
        </a>
      </header>
    );
  } else {
    return <></>;
  }
}
