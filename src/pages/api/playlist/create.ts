import dbConnect from "@/lib/dbConnect"
import Playlist from "@/models/Playlist"
import User from "@/models/User"
import { getSession } from "@auth0/nextjs-auth0"
import { NextApiRequest, NextApiResponse } from "next"

export interface IPlaylist {
    name: string
    url: string
    userId: string
    ownerName: string
    cover: string
    tracks: string[]
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        await dbConnect();

        const session = await getSession(req, res);

        if (!session) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const { name, url, tracks, cover } = req.body as {
            name: string,
            url: string,
            cover: string
            tracks: string[],
        };

        if (!name || !url || !tracks || !cover) {
            return res.status(400).json({ error: 'Please provide all required fields' });
        }

        const allowedChars = /(^[a-zA-Z0-9_\-#@\(\)\ ]+$)/;

        if (!allowedChars.test(name.trim())) {
            return res.status(400).json({ error: 'Name contains invalid characters' });
        }

        const user = await User.findOne({ auth0Id: session.user.sub });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const existingPlaylist = await Playlist.findOne({ userId: user._id });

        if (existingPlaylist) {
            return res.status(409).json({ error: 'Playlist already exists' });
        }

        const playlist: IPlaylist = {
            name: name.trim(),
            url,
            cover,
            userId: user._id,
            ownerName: user.name,
            tracks,
        };

        const newPlaylist = await Playlist.create(playlist);

        return res.status(201).json({ playlist: newPlaylist });
    }

    return res.status(405).json({ error: 'Method not allowed' });
}