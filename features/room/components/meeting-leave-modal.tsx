import React from 'react'

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useCall } from '@stream-io/video-react-sdk'
import { useRouter } from 'next/navigation'
  


interface Props {
    showLeaveAlert: boolean
    setShowLeaveAlert: (showLeaveAlert: boolean) => void
}


const MeetingLeaveModal = ({ showLeaveAlert, setShowLeaveAlert} : Props) => {

    const call = useCall()
    const router = useRouter()


    const confirmLeave = () => {
        if (!call) return
        call.leave()
        router.push('/dashboard')
    }
    return (
        <AlertDialog open={showLeaveAlert} onOpenChange={setShowLeaveAlert}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Leave the call?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to leave the call?
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction 
                        className='bg-destructive text-destructive-foreground hover:bg-destructive/80 hover:text-destructive-foreground'
                        onClick={confirmLeave}
                    >
                        Continue
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default MeetingLeaveModal