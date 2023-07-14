import { useUser } from "@auth0/nextjs-auth0/client";
import Login from "./login";
import Header from "@/components/Header";
import { ChangeEvent, useEffect, useState } from "react";
import { usePlaylistSearch } from "@/hooks/playlist";

export default function Component() {
  const { user, error, isLoading } = useUser();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchPlaylist, searchPlaylistResults, _] = usePlaylistSearch()

  useEffect(() => {
    if (searchQuery && searchQuery.length >= 3) {
      searchPlaylist(searchQuery)
    }
  }, [searchQuery])

  function handleSearch(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault()

    setSearchQuery(e.target.value)
  }

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  if (user) {
    return (
      <>
        <Header />
        <h1 className="flex justify-between px-3 mb-5">
          <span className="text-lg font-semibold self-center">
            Descubra playlists dos seus colegas ao redor do mundo
          </span>
          <img width={88} height={1} src="/assets/logo.svg" alt="Logo" />
        </h1>
        <div className="flex">
          <input
            onChange={handleSearch}
            type="text"
            id="input"
            placeholder="Procurando algo?"
            className="w-full border-2 rounded-md p-2 mx-3 text-gray text-sm"
          />
        </div>
        <div>Gêneros</div>

        <pre>
          {JSON.stringify(searchPlaylistResults)}
        </pre>

        <ul className="flex flex-wrap gap-y-5 mx-5 justify-center">
          {/* {playlists &&
            playlists.map((playlist, index) => (
              <li key={index} className="w-40">
                <PlaylistPreview
                  imgUrl={playlist.img}
                  username={playlist.username}
                  playlistName={playlist.name}
                />
              </li>
            ))} */}
        </ul>

        <a href="/api/auth/logout">Sign out</a>

        <style jsx>
          {`
            input {
              background: url("/assets/Search.svg") no-repeat scroll 7px 7px;
              padding-left: 30px;
            }
          `}
        </style>
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
