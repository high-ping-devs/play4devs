import { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const { accessToken } = await getServerSession(req, res, authOptions)

        const requestURL = `https://api.spotify.com/v1/me/playlists?limit=${req.query.limit}&offset=${req.query.offset}`

        const spotifyApiResponse = await fetch(requestURL, {
            headers: {
                Authorization: 'Bearer ' + accessToken,
            }
        })

        res.status(200).json(await spotifyApiResponse.json())
    }
}