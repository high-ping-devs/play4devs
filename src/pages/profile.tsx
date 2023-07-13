import Header from "@/components/Header";
import React from "react";
import UserProfileImage from "@/components/UserProfileImage";
import LikeButton from "@/components/LikeButton";
import {
  useSpotifyPlaylist,
  useSpotifyTracks,
  useSpotifyUserPlaylists,
} from "@/hooks/spotify";
import { useUser } from "@auth0/nextjs-auth0/client";
import Track from "@/components/Track";

export default function profile() {
  const [playlist, playlistError] = useSpotifyUserPlaylists(15, 0);
  const [IdPlaylist, playlistErrorrrr] = useSpotifyPlaylist(
    "3W90dR5oQhXTxlZ8Kp6RRz"
  );
  const { user } = useUser();
  console.log(IdPlaylist);

  let dadosPlaylist = null;
  if (playlist) {
    dadosPlaylist = playlist.items[0];
  }
  console.log(playlist);

  return (
    <div>
      <Header />
      <div className="w-screen h-32 bg-[#C5C5C5] border-b-2"></div>
      <UserProfileImage width={88} transform="-translate-y-12" margin="ml-5" />
      <div className="flex justify-between mx-5">
        <div className="flex">
          <img
            src="/assets/spotify.svg"
            alt="Logo do spotify"
            className="w-6"
          />
          <span className="self-center text-base font-semibold">
            {user?.name}
          </span>
        </div>
        <LikeButton transform="-translate-y-12" />
      </div>
      <div className="flex flex-col mx-5">
        <span className="font-semibold text-base">{dadosPlaylist?.name}</span>
        <span className="text-gray text-sm mb-4">
          {dadosPlaylist?.tracks.total} faixas
        </span>
        <a
          href={dadosPlaylist?.external_urls.spotify}
          target="_blank"
          className="flex gap-1 text-sm hover:underline"
        >
          Ouvir no Spotify <img src="/assets/Redirect.svg" alt="Redirecionar" />
        </a>
      </div>
      <div className="flex flex-col w-screen justify-center items-center pt-4">
        <Track
          artist="The Sunset Rollercoaster"
          title="Let There Be Light Again"
          time="4:00"
        />
        <Track artist="The Weeknd" title="Blinding Lights" time="3:20" />
      </div>
    </div>
  );
}
