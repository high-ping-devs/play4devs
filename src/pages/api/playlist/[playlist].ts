import dbConnect from "@/lib/dbConnect"
import Playlist from "@/models/Playlist"
import User from "@/models/User"
import { getSession } from "@auth0/nextjs-auth0"
import { NextApiRequest, NextApiResponse } from "next"
import { IPlaylist } from "./create"
import { isObjectIdOrHexString } from "mongoose"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { playlist: playlistParam } = req.query;

    if (req.method === 'GET') {
        await dbConnect();

        const session = await getSession(req, res);

        if (!session) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        if (playlistParam === 'all') {
            const { limit, offset } = req.query;

            const playlists = await Playlist.find({}, {}, { sort: { createdAt: -1 }, limit: Number(limit), skip: Number(offset) });

            return res.status(200).json({ playlists });
        }

        if (!isObjectIdOrHexString(playlistParam)) {
            return res.status(400).json({ error: 'Invalid playlist ID' });
        }

        const playlist = await Playlist.findOne({ _id: playlistParam });

        if (!playlist) {
            return res.status(404).json({ error: 'Playlist not found' });
        }

        return res.status(200).json({ playlist });
    }

    if (req.method === 'PUT') {
        await dbConnect();

        const session = await getSession(req, res);

        if (!session) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const { name, url, tracks } = req.body as {
            name: string,
            url: string,
            tracks: string[],
        };

        if (!name || !url || !tracks) {
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

        if (!playlistParam) {
            return res.status(400).json({ error: 'Please provide all required fields' });
        }

        if (!isObjectIdOrHexString(playlistParam)) {
            return res.status(400).json({ error: 'Invalid playlist ID' });
        }

        const playlist = await Playlist.findOne({ _id: playlistParam, userId: user._id });

        if (!playlist) {
            return res.status(404).json({ error: 'Playlist not found' });
        }

        if (playlist._id.toString() !== playlistParam) {
            return res.status(400).json({ error: 'Playlist does not match' });
        }

        const newPlaylist: IPlaylist = {
            name,
            url,
            userId: user._id,
            ownerName: user.name,
            tracks,
        };

        await Playlist.updateOne({ _id: playlistParam, userId: user._id }, newPlaylist);

        return res.status(200).json({ newPlaylist });
    }

    return res.status(405).json({ error: 'Method not allowed' });
}