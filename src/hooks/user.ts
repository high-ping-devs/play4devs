import { useUser } from "@auth0/nextjs-auth0/client";
import { useEffect, useState } from "react";

interface UserProfileData {
    playlistName: string;
    playlistUrl: string;
    playlistTracks: Array<any>;
    playlistCover: string;
}

export function useLoginState() {
    const { user, error, isLoading } = useUser();

    return { loggedIn: user ? true : false, error, isLoading }
}

export function useCreateUserProfile() {
    const [userProfile, setUserProfile] = useState()
    const [userPlaylist, setUserPlaylist] = useState()
    const [error, setError] = useState<null | string>()

    const createUserProfile = async (data: UserProfileData) => {
        try {
            const createUser = await fetch(`/api/user/create`, {
                method: 'POST',
            });

            if (createUser.ok) {
                setUserProfile(await createUser.json());
                setError(null);
            } else {
                setError(`Error: ${createUser.status} - ${await createUser.text()}`);
            }

            const createPlaylist = await fetch(`/api/playlist/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'same-origin',
                body: JSON.stringify({
                    name: data.playlistName,
                    cover: data.playlistCover,
                    url: data.playlistUrl,
                    tracks: data.playlistTracks
                })
            })

            if (createPlaylist.ok) {
                setUserPlaylist(await createPlaylist.json())
                setError(null);
            } else {
                setError(`Error: ${createPlaylist.status} - ${await createPlaylist.text()}`);
            }
        } catch (error: any) {
            setError(`Error: ${error.message}`);
        }
    }

    return [createUserProfile, {
        profile: userProfile,
        playlist: userPlaylist
    }, error] as [
            typeof createUserProfile,
            { profile: typeof userProfile, playlist: typeof userPlaylist },
            typeof error
        ]

}

export function useUpdateUserPlaylist() {
    const [userPlaylist, setUserPlaylist] = useState()
    const [error, setError] = useState<null | string>()

    const updateUserPlaylist = async (id: string, data: UserProfileData) => {
        try {
            const updatePlaylist = await fetch(`/api/playlist/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'same-origin',
                body: JSON.stringify({
                    name: data.playlistName,
                    cover: data.playlistCover,
                    url: data.playlistUrl,
                    tracks: data.playlistTracks
                })
            })

            if (updatePlaylist.ok) {
                setUserPlaylist(await updatePlaylist.json())
                setError(null);
            } else {
                setError(`Error: ${updatePlaylist.status} - ${await updatePlaylist.text()}`);
            }
        } catch (error: any) {
            setError(`Error: ${error.message}`);
        }
    }

    return [updateUserPlaylist, userPlaylist, error] as [typeof updateUserPlaylist, typeof userPlaylist, typeof error]
}

export function useGetCurrentUserProfile() {
    const [userProfile, setUserProfile] = useState();
    const [error, setError] = useState<null | string>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`/api/user/me`);

                if (res.ok) {
                    setUserProfile(await res.json());
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

    // const [userProfile, userProfileError] = useGetCurrentUserProfile()


    return [userProfile, error] as [typeof userProfile, typeof error]
}

export function useGetUserProfileById(id: string) {
    const [userProfile, setUserProfile] = useState();
    const [error, setError] = useState<null | string>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`/api/user/${id}`);

                if (res.ok) {
                    setUserProfile(await res.json());
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

    // const [userProfile, userProfileError] = useGetUserProfileById("64b14b2b64a36830a8b039d4")

    return [userProfile, error] as [typeof userProfile, typeof error]
}

export function useDeleteUser() {
    const [error, setError] = useState<null | string>();

    const deleteFunction = async (id: string) => {
        try {
            const res = await fetch(`/api/user/${id}`, { method: 'DELETE' });

            if (res.ok) {
                setError(null);
            } else {
                setError(`Error: ${res.status} - ${await res.text()}`);
            }
        } catch (error: any) {
            setError(`Error: ${error.message}`);
        }
    };

    return [deleteFunction, error] as [typeof deleteFunction, typeof error]
}