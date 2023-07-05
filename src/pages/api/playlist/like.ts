import dbConnect from "@/lib/dbConnect"
import Playlist from "@/models/Playlist"
import User from "@/models/User"
import { getSession } from "@auth0/nextjs-auth0"
import { NextApiRequest, NextApiResponse } from "next"
import { IPlaylist } from "./create"


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'PATCH') {
        await dbConnect();

        const session = await getSession(req, res);

        if (!session) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const user = await User.findOne({ auth0Id: session.user.sub });
        if (!user) {
            return res.status(400).json({ error: 'User not found' });
        }

        const oldPlaylist = await Playlist.findOne({ userId: user._id });

        if (!oldPlaylist) {
            return res.status(400).json({ error: 'Playlist not found' });
        }

       const newPlaylist =  Playlist.updateOne({user:user._id},{likeCount: oldPlaylist.likeCount+1 })
      

        return res.status(200).json({ newPlaylist });
    }
}