import dbConnect from "@/lib/dbConnect"
import User from "@/models/User"
import { getSession } from "@auth0/nextjs-auth0"
import { NextApiRequest, NextApiResponse } from "next"

export interface IUser {
    name: string
    image: string
    spotifyId: string
    auth0Id: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        await dbConnect();

        const session = await getSession(req, res);

        if (!session) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const foundUser = await User.findOne({ auth0Id: session.user.sub });

        if (!foundUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        return res.status(200).json({ foundUser, isCurrentUser: session.user.sub === foundUser.auth0Id });
    }

    return res.status(405).json({ error: 'Method not allowed' });
}