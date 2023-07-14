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
import { log } from "console";

export default function profile() {
  const [playlist, playlistError] = useSpotifyUserPlaylists(1, 0);
  const [tracks, tracksError] = useSpotifyTracks(playlist?.items[0].id, 10, 0);
  const { user } = useUser();

  const listaImaginaria = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  let dadosPlaylist = null;
  if (playlist) {
    dadosPlaylist = playlist.items[0];
  }

  function milissegundosParaMinutosFormatado(milissegundos) {
    const minutos = Math.floor(milissegundos / 1000 / 60);
    const segundos = Math.floor((milissegundos / 1000) % 60);

    const minutosFormatado = minutos < 10 ? `0${minutos}` : minutos;
    const segundosFormatado = segundos < 10 ? `0${segundos}` : segundos;

    return `${minutosFormatado}:${segundosFormatado}`;
  }
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
        {listaImaginaria.map((track, index) => {
          if (index < 3) {
            return (
              <li
                key={index}
                className="flex flex-col w-screen justify-center items-center pt-4"
              >
                <Track
                  image="https://images.genius.com/1e7aa66cc320566574cc1ed14b3f85a8.1000x1000x1.jpg"
                  artist="Sunset Rollercoaster"
                  title="Let There Be Light Again"
                  time="4:20"
                />
              </li>
            );
          }
          if (index == 4) {
            return (
              <div className="flex justify-center items-center my-6">
                <img src="assets/Dots.svg" alt="Três pontos" />
              </div>
            );
          } else {
            return null;
          }
        })}
        <button className="flex justify-center items-center mobileS:w-[90%] max-w-[326px]  h-14 bg-green mb-8 shadow-boxShadow rounded-[0.25rem] gap-2">
          <span className="text-base font-semibold leading-5 text-black">
            Ouvir no Spotify
          </span>
          <img
            src="/assets/spotify.svg"
            alt="Logo do spotify"
            className="w-6"
          />
        </button>
      </div>
    </div>
  );
}
