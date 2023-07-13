import Header from "@/components/Header";
import React from "react";
import UserProfileImage from "@/components/UserProfileImage";
import LikeButton from "@/components/LikeButton";
import { useSpotifyTracks, useSpotifyUserPlaylists } from "@/hooks/spotify";
import { useUser } from "@auth0/nextjs-auth0/client";
import Track from "@/components/Track";

export default function profile() {
  const [playlist, playlistError] = useSpotifyUserPlaylists(1, 0);
  const { user } = useUser();

  let dadosPlaylist = null;
  if (playlist) {
    dadosPlaylist = playlist.items[0];
  }
  console.log(playlist);

  return (
    <div>
      <Header />
      {playlist && (
        <img
          src={dadosPlaylist?.images[0].url}
          alt="Capa da Playlist"
          className="w-full object-cover object-center h-32 border-y-2"
        />
      )}
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
