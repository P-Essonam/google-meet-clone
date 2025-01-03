import React from 'react'
import { useBackgroundFilters } from "@stream-io/video-react-sdk";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { AlertTriangle, Loader } from 'lucide-react';
import { ScrollArea } from "@/components/ui/scroll-area"
import Image from 'next/image';




interface Props {
    blurLevel: blurLevel
    setOpen: (value: boolean) => void
    setBlurLevel: (value: blurLevel) => void
}

type blurLevel = "none" | "low" | "medium" | "high" | "disable"

const ImageSidebar = ({ blurLevel, setOpen, setBlurLevel} : Props) => {

    const {
        isSupported, // checks if these filters can run on this device
        isReady, // checks if the filters are ready to be enabled
        disableBackgroundFilter, // disables the filter
        applyBackgroundBlurFilter, // applies the blur filter
        applyBackgroundImageFilter, // applies the image filter
        backgroundImages, // list of available images
    } = useBackgroundFilters();

    const handleBlurChange = (value: blurLevel) => {
        setBlurLevel(value)
        if (value === "disable") {
            disableBackgroundFilter()
        } else if (value !== "none") {
            applyBackgroundBlurFilter(value)
        }
    }


    return (
        <aside className='bg-white relative h-full flex flex-col'>
            <div className='p-4 border-b space-y-1 h-[68px]'>
                <p className='text-sm font-medium'>
                    Images
                </p>
                <p className='text-xs text-muted-foreground'>
                    Add images to your background
                </p>
            </div>
            <div className='p-4 border-b space-y-4'>
                <p className='text-sm font-medium'>
                    Apply & disable filters to your background
                </p>
                <ToggleGroup 
                    type="single"
                    value={blurLevel}
                    onValueChange={(value: blurLevel) => {
                        setOpen(false)
                        handleBlurChange(value)
                    }}   
                    className='justify-start'
                >
                    <ToggleGroupItem value="disable" aria-label='Disbale background filter'>
                        Disbale
                    </ToggleGroupItem>
                    <ToggleGroupItem value="low" aria-label='Apply low blur'>
                        Low
                    </ToggleGroupItem>
                    <ToggleGroupItem value="medium" aria-label='Apply medium blur'>
                        Medium
                    </ToggleGroupItem>
                    <ToggleGroupItem value="high" aria-label='Apply High blur'>
                        High
                    </ToggleGroupItem>
                    
                </ToggleGroup>

            </div>
            {!isReady && isSupported && (
                <div className='flex items-center justify-center flex-1'>
                    <Loader className='w-4 h-4 animate-spin text-muted-foreground' />
                </div>
            )}
            {!isSupported && (
                <div className='flex flex-col gap-y-4 items-center justify-center flex-1'>
                    <AlertTriangle className='w-4 h-4 text-muted-foreground' />
                    <p className='text-muted-foreground text-xs'>
                        Background filters are not supported on this device
                    </p>
                </div>
            )}
            <ScrollArea>
                <div className='p-4'>
                    <div className='grid grid-cols-2 gap-4'>
                        {isSupported && backgroundImages && backgroundImages.map((image, index) => {
                            return (
                                <button
                                    key={index}
                                    onClick={() => {
                                        applyBackgroundImageFilter(image)
                                        setOpen(false)
                                    }}
                                    className='relative w-full h-[100px] group hover:opacity-75 bg-muted rounded-sm overflow-hidden border transition'
                                >
                                    <Image 
                                        fill
                                        src={image}
                                        alt='image'
                                        className='object-cover'
                                    />
                                </button>
                            )
                        })}
                    </div>
                </div>

            </ScrollArea>


        </aside>
    )
}

export default ImageSidebar