import React from 'react'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useCallStateHooks } from '@stream-io/video-react-sdk'
  

interface Props {
    disabled: boolean
}

const CustomDeviceSelectorAudioOutput = ({ disabled } : Props) => {

    const { useSpeakerState } = useCallStateHooks()
    const { speaker, devices, selectedDevice } = useSpeakerState()

    const handleSelect = async(value: string) => {
        await speaker.select(value)
    }
    return (
        <Select
            disabled={disabled}
            value={selectedDevice}
            onValueChange={handleSelect}
        >
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Select speaker" />
            </SelectTrigger>
            <SelectContent>
                {devices?.map((device) => (
                    <SelectItem key={device.deviceId} value={device.deviceId}>
                        {device.label || `Speaker ${device.deviceId.slice(0, 5)}`}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>

    )
}

export default CustomDeviceSelectorAudioOutput