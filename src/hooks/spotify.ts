import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

export function useSpotifyTracks(playlistId: string, limit: number, offset: number) {
    const [tracks, setTracks] = useState<SpotifyApi.PlaylistTrackResponse | undefined>();
    const [error, setError] = useState<string | undefined>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`/api/spotify/tracks?id=${playlistId}&limit=${limit}&offset=${offset}`);

                if (res.ok) {
                    setTracks(await res.json());
                    setError(undefined);
                } else {
                    setError(`Error: ${res.status} - ${await res.text()}`);
                }
            } catch (error: any) {
                setError(`Error: ${error.message}`);
            }
        };

        fetchData();
    }, [playlistId, limit, offset]);

    return [tracks, error] as [typeof tracks, typeof error];
}

export function useSpotifyPlaylist(playlistId: string) {
    const [playlist, setPlaylist] = useState<SpotifyApi.PlaylistObjectFull | undefined>();
    const [error, setError] = useState<string | undefined>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`/api/spotify/playlist?id=${playlistId}`);

                if (res.ok) {
                    setPlaylist(await res.json());
                    setError(undefined);
                } else {
                    setError(`Error: ${res.status} - ${await res.text()}`);
                }
            } catch (error: any) {
                setError(`Error: ${error.message}`);
            }
        };

        fetchData();
    }, [playlistId]);

    return [playlist, error] as [typeof playlist, typeof error];
}

export function useSpotifyUserPlaylists(limit: number, offset: number) {
    const [playlists, setPlaylists] = useState<SpotifyApi.ListOfCurrentUsersPlaylistsResponse | undefined>();
    const [error, setError] = useState<string | undefined>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`/api/spotify/users-playlists/?limit=${limit}&offset=${offset}`);

                if (res.ok) {
                    setPlaylists(await res.json());
                    setError(undefined);
                } else {
                    setError(`Error: ${res.status} - ${await res.text()}`);
                }
            } catch (error: any) {
                setError(`Error: ${error.message}`);
            }
        };

        fetchData();
    }, [limit, offset]);

    return [playlists, error] as [typeof playlists, typeof error];
}

export function useSpotifyProfile() {

    const [profile, setProfile] = useState<any>();
    const [error, setError] = useState<string | undefined>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`/api/spotify/profile`);

                if (res.ok) {
                    setProfile(await res.json());
                    setError(undefined);
                } else {
                    setError(`Error: ${res.status} - ${await res.text()}`);
                }
            } catch (error: any) {
                setError(`Error: ${error.message}`);
            }
        };

        fetchData();
    }, [])

    return [profile, error] as [typeof profile, typeof error];
}