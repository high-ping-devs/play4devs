import dbConnect from "@/lib/dbConnect"
import Playlist from "@/models/Playlist"
import User from "@/models/User"
import { getSession } from "@auth0/nextjs-auth0"
import { NextApiRequest, NextApiResponse } from "next"


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        await dbConnect();

        const session = await getSession(req, res);

        if (!session) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const user = await User.findOne({ auth0Id: session.user.sub });
        const playlist = await Playlist.findOne({ userId: user._id });

        if (!playlist) {
            return res.status(400).json({ error: 'Playlist not found' });
        }

        return res.status(200).json({ playlist });
    }
}