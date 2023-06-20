import { useSpotifyUserPlaylists, useSpotifyTracks, useSpotifyPlaylist, useSpotifyProfile } from "@/hooks/spotify";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function Component() {
  const [usersPlaylists, usersPlaylistsError] = useSpotifyUserPlaylists(1, 0)
  const [tracks, tracksError] = useSpotifyTracks('0A6utctOZywAbYz2xwULAd', 5, 0)
  const [playlist, playlistError] = useSpotifyPlaylist('0A6utctOZywAbYz2xwULAd')
  const [spotifyProfile, spotifyProfileError] = useSpotifyProfile()

  const { user, error, isLoading } = useUser()

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>{error.message}</div>

  if (user) {
    return (
      <>
        <h1>
          Signed in as {user.name}
        </h1>

        <p>{user.email}</p>

        {spotifyProfile && <img src={spotifyProfile.images[0] ? spotifyProfile.images[0].url : user.picture} alt="alt" />}

        <a href="/api/auth/logout">Sign out</a>

        <details>
          <summary>Playlists</summary>
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
        </details>
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      <a href="/api/auth/login">Sign in</a>
    </>
  )


}
