import { getAuth0UserInfo } from "@/lib/utils/getAuth0UserInfo"
import { getSession } from "@auth0/nextjs-auth0"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const session = await getSession(req, res)

        if (!session) {
            return res.status(401).json({ error: 'Unauthorized' })
        }

        const requestURL = `https://api.spotify.com/v1/playlists/${req.query.id}/tracks?limit=${req.query.limit}&offset=${req.query.offset}`

        const spotifyApiResponse = await fetch(requestURL, {
            headers: {
                Authorization: 'Bearer ' + (await getAuth0UserInfo(session)).identities?.find((identity: { connection: string }) => identity.connection === 'spotify')?.access_token
            }
        })

        console.log((await getAuth0UserInfo(session)).identities?.find((identity: { connection: string }) => identity.connection === 'spotify')?.access_token)

        if (spotifyApiResponse.status === 200) {
            return res.status(200).json(await spotifyApiResponse.json())
        }

        return res.status(spotifyApiResponse.status).json({ error: spotifyApiResponse.statusText })
    }

    return res.status(405).json({ error: 'Method not allowed' });
}