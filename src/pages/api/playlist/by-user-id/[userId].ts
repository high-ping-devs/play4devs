import dbConnect from "@/lib/dbConnect"
import Playlist from "@/models/Playlist"
import { getSession } from "@auth0/nextjs-auth0"
import { NextApiRequest, NextApiResponse } from "next"
import { isObjectIdOrHexString } from "mongoose"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { userId } = req.query;

    if (req.method === 'GET') {
        await dbConnect();

        const session = await getSession(req, res);

        if (!session) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        if (!isObjectIdOrHexString(userId)) {
            return res.status(400).json({ error: 'Invalid userId' });
        }

        const playlist = await Playlist.findOne({ userId: userId });

        if (!playlist) {
            return res.status(404).json({ error: 'Playlist not found' });
        }

        return res.status(200).json({ playlist });
    }

    return res.status(405).json({ error: 'Method not allowed' });
}