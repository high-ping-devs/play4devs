import { useSession, signIn, signOut } from "next-auth/react"
import { useState } from "react"

export default function Component() {
  const { data } = useSession()
  const user = data?.user

  const [playlists, setPlaylists] = useState<{
    items: any[]
  }>()

  const [selectedPlaylist, setSelectedPlaylist] = useState<any>()
  const [selectedPlaylistTracks, setSelectedPlaylistTracks] = useState<any>()

  const userPlaylists = async () => {
    const res = await fetch('/api/spotify/user-playlists?limit=2&offset=0')

    setPlaylists(await res.json())
  }

  const selectPlaylist = async (playlistId: string) => {
    const res = await fetch(`/api/spotify/playlist?id=${playlistId}`)
    setSelectedPlaylist(await res.json())
  }

  const selectPlaylistTracks = async (playlistId: string) => {
    const res = await fetch(`/api/spotify/tracks?id=${playlistId}&limit=5&offset=0`)
    setSelectedPlaylistTracks(await res.json())
  }

  if (user) {
    return (
      <>
        Signed in as {user?.email ?? 'Unknown'} <br />
        <img src={user?.image!} alt={user?.name!} />
        <button onClick={() => signOut()}>Sign out</button>

        <button onClick={() => userPlaylists()}>Get Playlists</button>

        <h2>Playlists</h2>
        <pre>
          {JSON.stringify(playlists, null, 2)}
        </pre>

        <button onClick={() => selectPlaylist('0A6utctOZywAbYz2xwULAd')}>Select Playlist</button>

        <h2>Selected playlist</h2>
        <pre>
          {JSON.stringify(selectedPlaylist, null, 2)}
        </pre>

        <button onClick={() => selectPlaylistTracks('0A6utctOZywAbYz2xwULAd')}>Select Playlist Tracks</button>

        <h2>Selected playlist tracks</h2>
        <pre>
          {JSON.stringify(selectedPlaylistTracks, null, 2)}
        </pre>
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  )
}
