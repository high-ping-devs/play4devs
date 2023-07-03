import { useUser } from "@auth0/nextjs-auth0/client";
import { useSpotifyProfile } from "@/hooks/spotify";

export default function UserProfileImage({
  width,
  transform,
  margin,
}: {
  width: number;
  transform?: string;
  margin?: string;
}) {
  const { user } = useUser();
  const [spotifyProfile, spotifyProfileError] = useSpotifyProfile();
  if (user) {
    return (
      <>
        {spotifyProfile && (
          <img
            src={
              spotifyProfile.images[0]
                ? spotifyProfile.images[0].url
                : user.picture
            }
            width={width}
            alt="Perfil"
            className={`rounded-full shadow-boxShadow object-cover ${transform} ${margin}`}
          />
        )}
      </>
    );
  } else {
    return <></>;
  }
}
