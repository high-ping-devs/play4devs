import { useUser } from "@auth0/nextjs-auth0/client";
import Login from "./login";
import Header from "@/components/Header";
import { ChangeEvent, Key, useEffect, useState } from "react";
import { useGetAllPlaylists, usePlaylistSearch } from "@/hooks/playlist";
import PlaylistPreview from "@/components/PlaylistPreview";

export default function Component() {
  const { user, error, isLoading } = useUser();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [allPlaylists, errorAllPlaylists] = useGetAllPlaylists(999, 0);
  const [searchPlaylist, searchPlaylistResults, _] = usePlaylistSearch();

  useEffect(() => {
    if (searchQuery && searchQuery.length >= 3) {
      searchPlaylist(searchQuery);
    }
  }, [searchQuery]);

  function handleSearch(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setSearchQuery(e.target.value);
  }
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  if (user) {
    return (
      <>
        <Header />
        <h1 className="flex justify-between px-3 mb-5 max-w-3xl mx-auto py-14">
          <span className="text-lg font-semibold self-center">
            Descubra playlists dos seus colegas ao redor do mundo
          </span>
          <img width={88} height={1} src="/assets/logo.svg" alt="Logo" />
        </h1>
        <div className="flex justify-between max-w-3xl mx-auto">
          <input
            onChange={handleSearch}
            type="text"
            id="input"
            placeholder="Procurando algo?"
            className="w-full p-2 border-2 rounded-md text-gray text-sm"
          />
          <img
            className="-translate-x-8"
            src="assets/Search.svg"
            alt="Buscar playlist ou usuário"
          />
        </div>

        <ul className="flex justify-center items-center">
          <div className="grid grid-cols-2  sm:grid-cols-3 md:grid-cols-4  gap-4 mobileL:gap-8 md:gap-9 mx-5 mt-6">
            {searchPlaylistResults &&
              searchPlaylistResults.results.length > 0 ? (
              searchPlaylistResults.results.map(
                (
                  playlist: { cover: string; ownerName: string; name: string, url: string },
                  index: Key
                ) => (
                  <li key={index} className="w-40">
                    <PlaylistPreview
                      imgUrl={playlist.cover}
                      username={playlist.ownerName}
                      playlistName={playlist.name}
                      url={playlist.url}
                    />
                  </li>
                )
              )
            ) : allPlaylists && searchQuery === "" ? (
              allPlaylists.playlists.map(
                (
                  playlist: { cover: string; username: string; name: string, url: string },
                  index: Key
                ) => (
                  <li key={index} className="w-40">
                    <PlaylistPreview
                      imgUrl={playlist.cover}
                      username={playlist.username}
                      playlistName={playlist.name}
                      url={playlist.url}
                    />
                  </li>
                )
              )
            ) : (
              <li>Nenhuma playlist encontrada</li>
            )}
          </div>
        </ul>
      </>
    );
  } else {
    return (
      <>
        <Login />
      </>
    );
  }
}
