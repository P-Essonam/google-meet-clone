"use client";

import React, { useState } from 'react'
import { useGetCall } from '@/features/room/hooks/use-get-call'
import { BackgroundFiltersProvider, StreamCall, StreamTheme } from '@stream-io/video-react-sdk'
import Unauthorized from '@/features/room/components/unauthorized';
import Loading from '@/features/room/components/loading';
import Prejoin from '@/features/room/components/prejoin';
import { images } from '@/features/room/lib/utils';
import Room from '@/features/room/components/room';



interface Props {
    params: {
        roomName: string
    }
}

const Page = ({ params } : Props) => {

    const { isLoading, call } = useGetCall({ roomName: params.roomName })
    const [isSetupComplete, setIsSetupComplete] = useState(false)

    if (isLoading) return <Loading title={"Setting up your room..."}/>
    if (!call) return <Unauthorized />
    return (
        <StreamCall call={call}>
            <StreamTheme className='w-full h-full'>
                {!isSetupComplete ? (
                    <Prejoin  setIsSetupComplete={setIsSetupComplete} />
                ) : (
                    <BackgroundFiltersProvider
                        backgroundBlurLevel={undefined}
                        backgroundImages={images}
                    >
                        <Room />
                    </BackgroundFiltersProvider>
                )}
            </StreamTheme>
        </StreamCall>
    )
}

export default Page