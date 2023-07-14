import { useState } from "react";

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