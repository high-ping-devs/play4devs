import { Session } from "@auth0/nextjs-auth0"
import { UserProfile } from "@auth0/nextjs-auth0/client"
import { ManagementClient, ManagementClientOptions } from "auth0"

const auth0 = new ManagementClient({
    clientId: process.env.AUTH0_API_CLIENT_ID,
    clientSecret: process.env.AUTH0_API_CLIENT_SECRET,
    domain: process.env.AUTH0_DOMAIN,
} as ManagementClientOptions)

export async function getAuth0UserInfo(session: Session) {
    const user = await auth0.getUser({ id: session.user.sub })

    return user as any
}

export async function setUserIDAuth0AppMetadata(session: Session, userID: string) {
    await auth0.updateAppMetadata({ id: session.user.sub }, { userID })
}

export async function getAuth0UserMetadata(session: Session) {
    const user = await auth0.getUser({ id: session.user.sub })

    return user.app_metadata
}