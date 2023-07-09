import dbConnect from "@/lib/dbConnect"
import User from "@/models/User"
import Playlist from "@/models/Playlist"
import { getSession } from "@auth0/nextjs-auth0"
import { NextApiRequest, NextApiResponse } from "next"
import { isObjectIdOrHexString } from "mongoose"


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { user } = req.query;
    if (req.method === 'GET') {
        await dbConnect();

        const session = await getSession(req, res);

        if (!session) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        if (!isObjectIdOrHexString(user)) {
            return res.status(400).json({ error: 'Invalid user ID' });
        }

        const foundUser = await User.findOne({ _id: user });

        if (!foundUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        return res.status(200).json({ foundUser, isCurrentUser: session.user.sub === foundUser.auth0Id });
    }

    if (req.method === 'DELETE') {
        await dbConnect();

        const session = await getSession(req, res);

        if (!session) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        if (!isObjectIdOrHexString(user)) {
            return res.status(400).json({ error: 'Invalid user ID' });
        }

        const foundUser = await User.findOne({ _id: user });

        if (!foundUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (session.user.sub !== foundUser.auth0Id) {
            return res.status(403).json({ error: 'Forbidden' });
        }

        await User.deleteOne({ _id: user });

        await Playlist.deleteMany({ userId: user });

        return res.status(200).json({ message: 'User deleted' });
    }

    return res.status(405).json({ error: 'Method not allowed' });
}