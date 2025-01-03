"use client"

import React from 'react'

import {
    StreamVideo,
} from "@stream-io/video-react-sdk";
import { useRoom } from '@/features/room/hooks/use-room';

interface Props {
    children: React.ReactNode
    user: {
        id: string
        name: string
        image: string
    }
}


const RoomProvider = ({ children, user } : Props) => {

    const { client } = useRoom({
        id: user.id,
        name: user.name,
        image: user.image,
    })

    if (!client) return null
    return (
        <StreamVideo client={client}>
            {children}
        </StreamVideo>
    )
}

export default RoomProvider