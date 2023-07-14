import { useUser } from "@auth0/nextjs-auth0/client";
import Login from "./login";
import Header from "@/components/Header";
import { ChangeEvent, useEffect, useState } from "react";
import { usePlaylistSearch } from "@/hooks/playlist";
import PlaylistPreview from "@/components/PlaylistPreview";

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
  const listaImaginaria = [1, 2, 3, 4, 5, 6, 7, 8, 9]
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


        <ul className="flex justify-center items-center ">
          <div className="grid grid-cols-2  sm:grid-cols-3 md:grid-cols-4  gap-4 mobileL:gap-8 md:gap-9 mx-5 mt-6">
            {listaImaginaria &&
              listaImaginaria.map((playlist, index) => (
                <li key={index} className="flex justify-center">
                  <PlaylistPreview
                    imgUrl="https://github.com/joevtap.png"
                    username="jKvothe"
                    playlistName="Músicas tristes para ouvir no banho"
                  />
                </li>
              ))}
          </div>
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
