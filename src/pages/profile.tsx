import Header from "@/components/Header";
import React from "react";
import UserProfileImage from "@/components/UserProfileImage";
import LikeButton from "@/components/LikeButton";
import { useSpotifyTracks, useSpotifyUserPlaylists } from "@/hooks/spotify";
import { useUser } from "@auth0/nextjs-auth0/client";

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
      <section className="flex w-screen justify-center pt-4">
        <div className="flex justify-center mobile:w-80">
          <img
            className=" flex justify-center items-center pr-4"
            src="/assets/trackPicture.png"
            alt="Capa da música"
          />
          <div className="flex flex-col pr-8 justify-center items-start">
            <span className="font-semibold text-sm text-black">
              Let There Be Light Again
            </span>
            <span className="font-normal text-xs text-[#323232]">
              OFFICIAL HIGE DANDISM
            </span>
          </div>
          <span className="flex justify-center items-center text-sm font-normal">
            4:20
          </span>
        </div>
      </section>
    </div>
  );
}
