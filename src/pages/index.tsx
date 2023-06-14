import { useSpotifyPlaylist, useSpotifyProfile, useSpotifyTracks, useSpotifyUserPlaylists } from "@/hooks/spotify"
import { signIn, signOut } from "next-auth/react"

export default function Component() {
  const profile = useSpotifyProfile()
  // const [usersPlaylists, usersPlaylistsError] = useSpotifyUserPlaylists(1, 0)
  // const [tracks, tracksError] = useSpotifyTracks('0A6utctOZywAbYz2xwULAd', 5, 0)
  // const [playlist, playlistError] = useSpotifyPlaylist('0A6utctOZywAbYz2xwULAd')

  if (profile) {
    return (
      <>
        <h1>
          Signed in as {profile.name}
        </h1>

        <img src={profile.image} alt={profile.name} />

        <p>{profile.email}</p>
        <p>{profile.id}</p>

        <button onClick={() => signOut()}>Sign out</button>
        {/* 
        <details>
          <summary>Playlists</summary>
          <img src={!usersPlaylistsError ? usersPlaylists?.items[0].images[0].url : ''} alt="" />
          <pre>{!usersPlaylistsError && JSON.stringify(usersPlaylists, null, 2)}</pre>
        </details>

        <details>
          <summary>Tracks</summary>
          <audio controls src={!tracksError ? tracks?.items[1].track?.preview_url! : ''}></audio>

          <pre>{!tracksError && JSON.stringify(tracks, null, 2)}</pre>
        </details>

        <details>
          <summary>Playlist</summary>
          <pre>{!playlistError && JSON.stringify(playlist, null, 2)}</pre>
        </details> */}
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
