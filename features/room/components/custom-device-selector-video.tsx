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

const CustomDeviceSelectorVideo = ({ disabled } : Props) => {

    const { useCameraState } = useCallStateHooks()
    const { camera, devices, selectedDevice } = useCameraState()

    const handleSelect = async(value: string) => {
        await camera.select(value)
    }
    return (
        <Select
            disabled={disabled}
            value={selectedDevice}
            onValueChange={handleSelect}
        >
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Select camera" />
            </SelectTrigger>
            <SelectContent>
                {devices?.map((device) => (
                    <SelectItem key={device.deviceId} value={device.deviceId}>
                        {device.label || `Camera ${device.deviceId.slice(0, 5)}`}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>

    )
}

export default CustomDeviceSelectorVideo