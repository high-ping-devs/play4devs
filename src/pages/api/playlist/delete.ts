import dbConnect from "@/lib/dbConnect"
import Playlist from "@/models/Playlist"
import User from "@/models/User"
import { getSession } from "@auth0/nextjs-auth0"
import { NextApiRequest, NextApiResponse } from "next"


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'DELETE') {
        await dbConnect();

        const session = await getSession(req, res);

        if (!session) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const user = await User.findOne({ auth0Id: session.user.sub });

        if (!user) {
            return res.status(400).json({ error: 'User not found' });
        }

        Playlist.deleteOne({userId:  user._id})
            .catch((error) => {
                console.log(error)
                res.status(500).json({error: error})
            })

        return res.status(201).json({ res: "playlist deleted"});
    }
}