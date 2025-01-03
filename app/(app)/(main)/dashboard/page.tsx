"use client";

import MeetingInfoModal from '@/components/meeting-info-modal';
import { GlareCard } from '@/components/ui/glare-card';
import useCurrentUser from '@/hooks/use-current-user';
import { generateRoomId } from '@/lib/utils';
import { useStreamVideoClient } from '@stream-io/video-react-sdk';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { toast } from 'sonner';

const Page = () => {

  const router = useRouter()
  const [meetingUrl, setMeetingUrl] = useState("")
  const [showMeetingInfo, setShowMeetingInfo] = useState(false)
  const user = useCurrentUser()
  const client = useStreamVideoClient()

  const instantMeeting = async() => {
    try {
      if (!client || !user || !user.id) return

      const roomId = generateRoomId()
      const call = client.call("default", roomId);
      await call.getOrCreate({
        data: {
          starts_at: new Date().toISOString(),
        },
      });

      router.push(`/${roomId}`)

    } catch (error) {
      console.error("Error starting call",error)
      toast.error("Error starting call")
    }
  }
  const scheduleMeeting = async() => {
    try {
      if (!client || !user || !user.id) return

      const roomId = generateRoomId()
      const call = client.call("default", roomId);
      await call.getOrCreate();
      setMeetingUrl(`${process.env.NEXT_PUBLIC_BASE_URL}/${roomId}`)
      setShowMeetingInfo(true)
    } catch (error) {
      console.error("Error scheduling call",error)
      toast.error("Error scheduling call")
    }
  }

  return (
    <main className='w-full h-full flex flex-col items-center p-4'>
      <h1 className='text-4xl md:text-7xl font-bold max-w-7xl'>
        New meeting
      </h1>
      <p className='mt-5 font-normal text-base max-w-xl text-center'>
        Begin your meeting now and engage seamlessly with others in real-time.
      </p>
      <div className='flex flex-col md:flex-row md:items-center mt-12 md:mt-20 gap-y-8 md:gap-y-0 md:gap-x-8'>
        <div onClick={instantMeeting}>
          <GlareCard className="flex flex-col items-center justify-center">
            <svg
              width="66"
              height="65"
              viewBox="0 0 66 65"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7 text-white"
            >
              <path
                d="M8 8.05571C8 8.05571 54.9009 18.1782 57.8687 30.062C60.8365 41.9458 9.05432 57.4696 9.05432 57.4696"
                stroke="currentColor"
                strokeWidth="15"
                strokeMiterlimit="3.86874"
                strokeLinecap="round"
              />
            </svg>
            <p className="text-white font-bold text-xl mt-4">
              Start an instant meeting
            </p>
          </GlareCard>
        </div>
        <div onClick={scheduleMeeting}>
          <GlareCard className="flex flex-col items-center justify-center">
            <svg
              width="66"
              height="65"
              viewBox="0 0 66 65"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7 text-white"
            >
              <path
                d="M8 8.05571C8 8.05571 54.9009 18.1782 57.8687 30.062C60.8365 41.9458 9.05432 57.4696 9.05432 57.4696"
                stroke="currentColor"
                strokeWidth="15"
                strokeMiterlimit="3.86874"
                strokeLinecap="round"
              />
            </svg>
            <p className="text-white font-bold text-xl mt-4">
              Schedule a future meeting
            </p>
          </GlareCard>
        </div>
      </div>
      <MeetingInfoModal 
        isOpen={showMeetingInfo}
        onClose={() => setShowMeetingInfo(false)}
        meetingUrl={meetingUrl}
      />
    </main>
  )
}

export default Page