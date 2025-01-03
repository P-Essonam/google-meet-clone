"use client";

import MeetingInfoModal from '@/components/meeting-info-modal';
import { Button } from '@/components/ui/button';
import {
    CancelCallButton,
    DefaultParticipantViewUI,
    hasScreenShare,
    ParticipantView,
    ScreenShareButton,
    SpeakingWhileMutedNotification,
    ToggleAudioPublishingButton,
    ToggleVideoPublishingButton,
    useCall,
    useCallStateHooks,
} from '@stream-io/video-react-sdk';
import { Images, Info } from 'lucide-react';
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
  
import { useEffect, useState } from 'react';
import MeetingLeaveModal from './meeting-leave-modal';
import ImageSidebar from './image-sidebar';

type blurLevel = "none" | "low" | "medium" | "high" | "disable"


const SpeakerView = () => {
    const call = useCall();
    const { useParticipants } = useCallStateHooks();
    const [participantInSpotlight, ...otherParticipants] = useParticipants();
    const [showMeetingInfo, setShowMeetingInfo] = useState(false);
    const [showLeaveAlert, setShowLeaveAlert] = useState(false);
    const [meetingUrl, setMeetingUrl] = useState('');
    const [open, setOpen] = useState(false)
    const [blurLevelState, setBlurLevelState] = useState<blurLevel>("none");
    const isOneToOneCall = otherParticipants.length === 1;

    useEffect(() => {
        setMeetingUrl(window.location.href);
    }, []);
    

    return (
        <div className='flex flex-col h-full w-full p-4 text-white'>
            {isOneToOneCall ? (
                <div className='flex-1 flex flex-col lg:flex-row gap-4'>
                    <div className='flex-1 flex items-center justify-center'>
                        <ParticipantView
                            participant={participantInSpotlight}
                            trackType={
                                hasScreenShare(participantInSpotlight)
                                    ? 'screenShareTrack'
                                    : 'videoTrack'
                            }
                            ParticipantViewUI={DefaultParticipantViewUI}
                        />
                    </div>
                    <div className='flex-1 flex items-center justify-center'>
                        <ParticipantView
                            participant={otherParticipants[0]}
                            trackType={
                                hasScreenShare(otherParticipants[0])
                                    ? 'screenShareTrack'
                                    : 'videoTrack'
                            }
                            ParticipantViewUI={DefaultParticipantViewUI}
                        />
                    </div>
                </div>
            ) : (
                <>
                    {/* Multi-participant call layout */}
                    {
                        otherParticipants.length > 0 && (
                            <div className='flex flex-row items-center gap-2.5 h-48 min-h-48 overflow-x-auto scrollbar-hide'>
                                {otherParticipants.map((participant) => (
                                    <div className='w-60 min-w-[240px] first:ml-auto last:mr-auto' key={participant.sessionId}>
                                        <ParticipantView
                                            participant={participant}
                                            ParticipantViewUI={DefaultParticipantViewUI}
                                        />
                                    </div>
                                ))}
                            </div>
                        )
                    }
                    <div className='flex-1 flex items-center justify-center min-h-0 mt-4'>
                        {call && (
                            <ParticipantView
                                participant={participantInSpotlight}
                                trackType={
                                    hasScreenShare(participantInSpotlight)
                                        ? 'screenShareTrack'
                                        : 'videoTrack'
                                }
                                ParticipantViewUI={DefaultParticipantViewUI}
                            />
                        )}
                    </div>
                </>
            )}

            <CustomCallControls>
                <Button
                    variant={"ghost"}
                    size={"icon"}
                    className='size-9 rounded-full bg-gray-800 hover:bg-gray-700 hover:text-white'
                    onClick={() => setShowMeetingInfo(true)}
                >
                    <Info className='w-5 h-5' />
                </Button>
                <Sheet open={open} onOpenChange={setOpen}>
                    <SheetTrigger asChild>
                        <Button
                            variant={"ghost"}
                            size={"icon"}
                            className='w-9 h-9 rounded-full bg-gray-800 hover:bg-gray-700 hover:text-white'
                            onClick={() => setOpen(true)}
                        >
                            <Images className='w-5 h-5' />
                        </Button>
                    </SheetTrigger>
                    <SheetContent>
                        <ImageSidebar 
                            blurLevel={blurLevelState}
                            setOpen={setOpen}
                            setBlurLevel={setBlurLevelState}
                        />
                    </SheetContent>
                </Sheet>

                <SpeakingWhileMutedNotification>
                    <ToggleAudioPublishingButton />
                </SpeakingWhileMutedNotification>
                <ToggleVideoPublishingButton />
                <ScreenShareButton />
                {call && <CancelCallButton onClick={ () => setShowLeaveAlert(true)}/>}

            </CustomCallControls>
            <MeetingInfoModal 
                isOpen={showMeetingInfo}
                onClose={() => setShowMeetingInfo(false)}
                meetingUrl={meetingUrl}
            />
            <MeetingLeaveModal 
                showLeaveAlert={showLeaveAlert}
                setShowLeaveAlert={setShowLeaveAlert}
            />
        </div>
    )
}

export default SpeakerView


const CustomCallControls = ({ children }: { children: React.ReactNode}) => {
    return <div className="str-video__call-controls">{children}</div>;
};
  
  