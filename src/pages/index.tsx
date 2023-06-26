import {
  useSpotifyUserPlaylists,
  useSpotifyTracks,
  useSpotifyPlaylist,
  useSpotifyProfile,
} from "@/hooks/spotify";
import { useUser } from "@auth0/nextjs-auth0/client";
import Login from "./login";
import PlaylistPreview from "@/components/PlaylistPreview";
import Header from "@/components/Header";

export default function Component() {
  const [usersPlaylists, usersPlaylistsError] = useSpotifyUserPlaylists(1, 0);
  const [tracks, tracksError] = useSpotifyTracks(
    "0A6utctOZywAbYz2xwULAd",
    5,
    0
  );
  const [playlist, playlistError] = useSpotifyPlaylist(
    "0A6utctOZywAbYz2xwULAd"
  );
  const [spotifyProfile, spotifyProfileError] = useSpotifyProfile();

  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  if (user) {
    const playlists = [
      {
        img: "https://images.unsplash.com/photo-1546527868-ccb7ee7dfa6a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
        username: "User 1",
        name: "Playlist 1",
      },
      {
        img: "https://images.unsplash.com/photo-1546527868-ccb7ee7dfa6a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
        username: "User 2",
        name: "Playlist 2",
      },
      {
        img: "https://images.unsplash.com/photo-1546527868-ccb7ee7dfa6a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
        username: "User 3",
        name: "Playlist 3",
      },
      {
        img: "https://images.unsplash.com/photo-1546527868-ccb7ee7dfa6a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
        username: "User 4",
        name: "Playlist 4",
      },
    ];
    return (
      <>
        <Header />
        <h1 className="flex justify-between px-3 mb-5">
          <span className="text-lg font-semibold self-center">
            Descubra playlists dos seus colegas ao redor do mundo
          </span>
          <img width={88} height={1} src="/assets/logo.svg" alt="Logo" />
        </h1>

        <div className="border-2 rounded">Busca</div>

        <div>Estilos</div>

        <ul className="flex flex-wrap gap-5 mx-5 justify-center mobile:justify-normal">
          {playlists &&
            playlists.map((playlist, index) => (
              <li key={index}>
                <PlaylistPreview
                  imgUrl={playlist.img}
                  imgHeight={index % 2 === 0 ? "h-40" : "h-44"}
                  username={playlist.username}
                  playlistName={playlist.name}
                />
              </li>
            ))}
        </ul>

        {/* Usado para testes */}
        {spotifyProfile && (
          <img
            src={
              spotifyProfile.images[0]
                ? spotifyProfile.images[0].url
                : user.picture
            }
            alt="alt"
          />
        )}

        <a href="/api/auth/logout">Sign out</a>

        <details>
          <summary>Playlists</summary>
          <pre>
            {!usersPlaylistsError && JSON.stringify(usersPlaylists, null, 2)}
          </pre>
        </details>

        <details>
          <summary>Tracks</summary>
          <audio
            controls
            src={!tracksError ? tracks?.items[1].track?.preview_url! : ""}
          ></audio>
          <pre>{!tracksError && JSON.stringify(tracks, null, 2)}</pre>
        </details>

        <details>
          <summary>Playlist</summary>
          <pre>{!playlistError && JSON.stringify(playlist, null, 2)}</pre>
        </details>
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
