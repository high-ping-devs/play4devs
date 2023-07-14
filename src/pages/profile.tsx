import Header from "@/components/Header";
import React from "react";
import UserProfileImage from "@/components/UserProfileImage";
import {
  useSpotifyPlaylist,
  useSpotifyTracks,
  useSpotifyUserPlaylists,
} from "@/hooks/spotify";
import { useUser } from "@auth0/nextjs-auth0/client";
import Track from "@/components/Track";
import { log } from "console";
import IconButton from "@/components/iconButton";
import SmallButton from "@/components/SmallButton";

export default function profile() {
  // const [playlist, playlistError] = useSpotifyUserPlaylists(1, 0);
  // const [tracks, tracksError] = useSpotifyTracks(playlist?.items[0].id, 10, 0);
  const { user } = useUser();

  const listaImaginaria = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  let dadosPlaylist = null;
  // if (playlist) {
  //   dadosPlaylist = playlist.items[0];
  // }

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
      <div className="w-full flex h-32 bg-[#C5C5C5] border-b-2 justify-center">
        <div className="flex justify-end tablet:w-[660px] mobileS:w-[90%] mobileM:w-[93%] mobileL:w-[85%]">
          <div className="flex justify-between w-[96px] pt-4">
            <IconButton icon="/assets/Edit.svg" color="bg-green" altText="" linkRed=""/>
            <IconButton icon="/assets/Logout.svg" color="bg-[#FFAF75]" altText="" linkRed=""/>
          </div>
        </div>
      </div>
      <div className="flex  justify-center items-center w-full">
        <div className="flex justify-center items-center w-[800px]">
          <div className="flex flex-col justify-center items-start tablet:w-[660px] mobileS:w-[90%] mobileM:w-[93%] mobileL:w-[85%]">
            <UserProfileImage width={88} transform="-translate-y-12" />
            <div className="flex gap-2">
              <img
                src="/assets/Spotify.svg"
                alt="Logo do spotify"
                className="w-6"
              />
              <span className="self-center text-base font-semibold">
                {user?.name}
              </span>
            </div>
            {/* {dadosPlaylist?.name} */}
            <div className="flex flex-col my-1">
              <span className="font-semibold text-base ">
                Músicas tristes para alegrar a noite
              </span>
              <span className="text-gray text-sm">
                {/* {dadosPlaylist?.tracks.total} faixas */}
                35 faixas
              </span>
            </div>
            <a
              href={dadosPlaylist?.external_urls.spotify}
              target="_blank"
              className="flex gap-1 text-sm hover:underline"
            >
              Ouvir no Spotify{" "}
              <img src="/assets/Redirect.svg" alt="Redirecionar" />
            </a>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full justify-center items-center pt-4">
        {listaImaginaria.map((track, index) => {
          if (index < 7) {
            return (
              <li
                key={index}
                className="flex flex-col w-full justify-center items-center pt-4"
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
          if (index == 8) {
            return (
              <div className="flex justify-center items-center my-6">
                <img src="assets/Dots.svg" alt="Três pontos" />
              </div>
            );
          }
        })}
        <SmallButton 
          btnText="Ouvir no Spotify"
          sufixIcon="/assets/Spotify.svg"
          altTextSufix="Logo do spotify"
          color="bg-green"
          btnFunction={nomeDaFuncao}
          
        />
      </div>
    </div>
  );

  function nomeDaFuncao () {
    console.log('Eu estou funcionando')
  }
}
