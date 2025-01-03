import { StreamVideoClient } from "@stream-io/video-react-sdk"
import { useEffect, useState } from "react"
import { getToken } from "@/features/room/actions"


interface Props {
    id: string
    name: string
    image: string
}

const apiKey = process.env.NEXT_PUBLIC_STREAM_VIDEO_API_KEY

export function useRoom({ id, name, image} : Props) {

    
    const [client, setClient] = useState<StreamVideoClient | undefined>()

    useEffect(() => {
        if (!apiKey) throw new Error('Stream Video API Key not found')
        const client = new StreamVideoClient({
            apiKey: apiKey,
            user: {
                id: id,
                name: name,
                image: image,
            },
            tokenProvider: getToken
        })

        setClient(client)

        return () => {
            client.disconnectUser()
            setClient(undefined)
        }
    }, [id, name, image])
    
    return { client }
}