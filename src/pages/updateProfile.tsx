import { useUser } from "@auth0/nextjs-auth0/client";
import Login from "./login";
import { useSpotifyUserPlaylists } from "@/hooks/spotify";
import { useState, useEffect } from "react";

export default function updateProfile() {
  const { user, error, isLoading } = useUser();
  const [usersPlaylists, usersPlaylistsError] = useSpotifyUserPlaylists(15, 0);
  const playlists = [];
  const [vazio, setVazio] = useState(false);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [confirming, setConfirming] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    let timeout;

    if (confirming) {
      timeout = setTimeout(() => {
        setConfirming(false);
      }, 2000);
    }

    return () => clearTimeout(timeout);
  }, [confirming]);

  const handleDeleteButtonClick = () => {
    if (confirming) {
      // Chamar API pra excluir perfil
      setConfirmed(true);
    } else {
      setConfirming(true);
    }
  };

  const handlePlaylistChange = (event: { target: { value: any } }) => {
    const playlist = JSON.parse(event.target.value);
    setSelectedPlaylist(playlist);
    setVazio(false);
  }

  const handleDeletion = () => {
    //chamar a api para deletar o perfil

  }



  const handlePlaylistNameChange = (event: { target: { value: any } }) => {
    const nomePlaylist = event.target.value;
    if (nomePlaylist === "") setVazio(true);
    if (nomePlaylist !== "" && vazio) {
      setVazio(false);
    }
    setSelectedPlaylist({ ...selectedPlaylist, name: nomePlaylist });
  };

  if (usersPlaylists) {
    usersPlaylists.items
      .filter((playlist) => playlist.public)
      .map((playlist) => {
        playlists.push({
          id: playlist.id,
          name: playlist.name,
        });
      });
  }

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  if (user) {
    return (
      <div className="flex justify-center items-center h-screen mx-5">
        <div className="flex flex-col flex-start w-max-[50%]">
          <h1 className="text-lg font-bold">Atualize seu perfil</h1>
          <span className="text-base mt-2 mb-4">
            Quer mudar sua playlist aqui no app? Troque-a no campo abaixo.
          </span>
          <select
            className="rounded p-5 border-2"
            name="playlist"
            id="playlist"
            required
            onChange={handlePlaylistChange}
          >
            <option value="0" >Selecione uma playlist pública</option>
            {playlists.map((playlist) => (
              <option key={playlist.id} value={JSON.stringify(playlist)}>
                {playlist.name}
              </option>
            ))}
          </select>
          {(
            <>
              <span className="text-base mb-4 mt-6">
                Você também pode mudar o nome de exibição da playlist, caso
                esteja se sentindo criativo.
              </span>
              <input
                className={`rounded p-3 border-2 ${vazio ? "border-red-500" : ""}`}
                type="text"
                placeholder="{selectedPlaylist.name}"
                pattern="/(^[a-zA-Z0-9_\-#@\(\)\ ]+$)/g"
                title="Apenas letras, números, espaços e os caracteres _ - # @ ( ) são permitidos."
                value="{selectedPlaylist.name}"
                onChange={handlePlaylistNameChange}
              />
              {vazio && (
                <span className="text-red-500 text-sm">Nome não pode ser vazio</span>
              )}
              <button
                className={`h-14 ${vazio ? "bg-[#BABABA]" : "bg-green"} border-2 border-black border-solid rounded-lg 
                mt-6 px-4 shadow-boxShadow flex justify-center items-center text-base font-semibold text-black`}
                disabled={vazio}
                type="button"
                onClick={() => {
                  window.location.href = '/'
                }}
              >
                Atualizar
              </button>
              <button
                className={`h-14 ${confirming ? "bg-[#FFAF75]" : "bg-[#FF7575]"}  border-2 border-black border-solid rounded-lg 
                mt-6 px-4 shadow-boxShadow flex justify-center items-center text-base font-semibold text-black`}
                disabled={vazio}
                type="button"
                onClick={handleDeleteButtonClick}
              >
                {confirming ? 'Tenho certeza' : <>
                  Excluir Perfil
                  <img src="/assets/Delete.svg" alt="Deletar" className="ml-2" />
                </>}
              </button>
            </>
          )}
        </div>
      </div>
    );
  } else {
    return <Login />;
  }
}
