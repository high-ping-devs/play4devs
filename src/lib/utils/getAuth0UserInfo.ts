import { Session } from "@auth0/nextjs-auth0"
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
