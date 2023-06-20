import { getAuth0UserInfo } from "@/utils/getAuth0UserInfo"
import { getSession } from "@auth0/nextjs-auth0"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const session = await getSession(req, res)

        if (!session) {
            return res.status(401).json({ error: 'Unauthorized' })
        }

        const spotifyIDPInfo = await getAuth0UserInfo(session)

        return res.status(200).json({
            country: spotifyIDPInfo.country,
            display_name: spotifyIDPInfo.display_name,
            email: spotifyIDPInfo.email,
            external_urls: spotifyIDPInfo.external_urls,
            followers: spotifyIDPInfo.followers,
            explicit_content: spotifyIDPInfo.explicit_content,
            product: spotifyIDPInfo.product,
            images: spotifyIDPInfo.images,
        })
    }
}