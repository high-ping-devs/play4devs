
import dbConnect from "@/lib/dbConnect"
import Playlist from "@/models/Playlist"
import { getSession } from "@auth0/nextjs-auth0"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        await dbConnect();

        const session = await getSession(req, res);

        if (!session) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const { q } = req.query;

        if (!q) {
            return res.status(400).json({ error: 'Please provide a search query' });
        }

        const results = await Playlist.find(
            { $text: { $search: q as string } },
            { score: { $meta: "textScore" } }
        ).sort({ score: { $meta: "textScore" } });

        return res.status(200).json({ results });
    }

    return res.status(405).json({ error: 'Method not allowed' });
}