import dbConnect from "@/lib/dbConnect"
import User from "@/models/User"
import { getAuth0UserInfo, setUserIDAuth0AppMetadata } from "@/lib/utils/auth0ManagementAPI"
import { getSession } from "@auth0/nextjs-auth0"
import { NextApiRequest, NextApiResponse } from "next"

export interface IUser {
    name: string
    image: string
    spotifyId: string
    auth0Id: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        await dbConnect();

        const session = await getSession(req, res);

        if (!session) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const user = await User.findOne({ auth0Id: session.user.sub });

        if (!user) {
            try {
                const info = await getAuth0UserInfo(session)

                const user: IUser = {
                    auth0Id: session.user.sub,
                    spotifyId: info.uri.split(':')[2],
                    name: info.name,
                    image: info.images[0].url || info.picture || ''
                };

                const newUser = await User.create(user);

                await setUserIDAuth0AppMetadata(session, newUser._id);

                return res.status(201).json({ User: newUser });
            } catch (error) {
                console.error(error)
                return res.status(500).json({ error: 'Something went wrong', errorTrace: error });
            }
        }

        return res.status(409).json({ error: 'User already exists' });
    }

    return res.status(405).json({ error: 'Method not allowed' });
}