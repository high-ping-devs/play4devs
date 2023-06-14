// import { NextApiRequest, NextApiResponse } from "next"
// import { getServerSession } from "next-auth"
// import { authOptions } from "../auth/[...nextauth]"

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//     if (req.method === 'GET') {
//         const session = await getServerSession(req, res, authOptions)

//         if (!session) {
//             return res.status(401).json({ error: 'Unauthorized' })
//         }

//         const requestURL = `https://api.spotify.com/v1/me/playlists?limit=${req.query.limit}&offset=${req.query.offset}`

//         const spotifyApiResponse = await fetch(requestURL, {
//             headers: {
//                 Authorization: 'Bearer ' + session.accessToken,
//             }
//         })

//         if (spotifyApiResponse.status === 200) {
//             return res.status(200).json(await spotifyApiResponse.json())
//         }

//         return res.status(spotifyApiResponse.status).json({ error: spotifyApiResponse.statusText })
//     }
// }