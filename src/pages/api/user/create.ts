import dbConnect from "@/lib/dbConnect"
import Playlist from "@/models/Playlist"
import User from "@/models/User"
import { getAuth0UserInfo } from "@/utils/getAuth0UserInfo"
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
        console.log("salvando")
        const session = await getSession(req, res);

        if (!session) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const user = await User.findOne({ auth0Id: session.user.sub });
        

        if (!user) {
            const info = await getAuth0UserInfo(session)
            const user: IUser = {
                auth0Id : session.user.sub,
                spotifyId: info.spotifyId,
                name: info.name,
                image: info.image
            };

            const newUser = await User.create(user);

            return res.status(201).json({ User: newUser });
        }else{
            return res.status(400).json({ error: 'User already exists' });
        }
         
    }
}