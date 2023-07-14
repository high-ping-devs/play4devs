import { useEffect, useState } from "react";

export function usePlaylistSearch() {
    const [playlists, setPlaylists] = useState();
    const [error, setError] = useState<null | string>();

    const search = async (q: string) => {
        try {
            const res = await fetch(`/api/playlist/search?q=${q}`);

            if (res.ok) {
                setPlaylists(await res.json());
                setError(null);
            } else {
                setError(`Error: ${res.status} - ${await res.text()}`);
            }
        } catch (error: any) {
            setError(`Error: ${error.message}`);
        }
    };

    // USAGE:

    // const [searchPlaylist, searchPlaylistResults, _] = usePlaylistSearch()

    // useEffect(() => {
    //   if (searchQuery && searchQuery.length >= 3) {
    //     searchPlaylist(searchQuery)
    //   }
    // }, [searchQuery])

    return [search, playlists, error] as [typeof search, typeof playlists, typeof error];
}

export function useGetPlaylistByUserId(userId: string) {
    const [playlist, setPlaylist] = useState();
    const [error, setError] = useState<null | string>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`/api/playlist/by-user-id/${userId}`);

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

    }, [userId])

    // USAGE:

    // const [playlistByUserId, playlistByUserIdError] = useGetPlaylistByUserId("64b14b2b64a36830a8b039d4")


    return [playlist, error] as [typeof playlist, typeof error]
}

export function useGetAllPlaylists(limit: number, offset: number) {
    const [playlist, setPlaylist] = useState();
    const [error, setError] = useState<null | string>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`/api/playlist/all?limit=${limit}&offset=${offset}`);

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

    }, [])

    // USAGE:

    // const [playlists, playlistsError] = useGetAllPlaylists(15, 0)

    return [playlist, error] as [typeof playlist, typeof error]

}

export function useGetPlaylistById(id: string) {
    const [playlist, setPlaylist] = useState();
    const [error, setError] = useState<null | string>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`/api/playlist/${id}`);

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

    }, [id])

    // USAGE:

    // const [playlistById, playlistByIdError] = useGetPlaylistById("64b14b3f64a36830a8b039d8")

    return [playlist, error] as [typeof playlist, typeof error]
}