"use client";

import React from 'react'
import { CallingState, useCallStateHooks } from '@stream-io/video-react-sdk'
import Loading from './loading';
import SpeakerView from './speaker-view';



const Room = () => {
    const { useCallCallingState } = useCallStateHooks()
    const callingState = useCallCallingState()

    if (callingState !== CallingState.JOINED) {
        return <Loading title='Joining call...' />
    }

    
    return (
        <SpeakerView />
    )
}

export default Room