"use server"

import currentUser from "@/lib/auth"
import { StreamClient } from "@stream-io/node-sdk";


const STREAM_VIDEO_API_KEY = process.env.NEXT_PUBLIC_STREAM_VIDEO_API_KEY
const STREAM_VIDEO_SECRET = process.env.STREAM_VIDEO_API_SECRET


export const getToken = async () => {
    const user = await currentUser()
    if (!user || !user.id || !user.name || !user.image) throw new Error('User not found')
    
    if (!STREAM_VIDEO_API_KEY) throw new Error('Stream Video API Key not found')
    if (!STREAM_VIDEO_SECRET) throw new Error('Stream Video Secret not found')

    const client = new StreamClient(STREAM_VIDEO_API_KEY, STREAM_VIDEO_SECRET)

    const expirationTime = Math.floor(Date.now() / 1000) + 3600
    const issuedAt = Math.floor(Date.now() / 1000) - 60

    const token = client.generateUserToken({user_id: user.id, exp: expirationTime, iat: issuedAt})

    return token

}