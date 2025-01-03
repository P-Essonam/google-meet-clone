"use client"

import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog"
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Check, Copy } from 'lucide-react'
import { toast } from 'sonner'
  

interface Props {
    isOpen: boolean
    onClose: () => void
    meetingUrl: string
}


const MeetingInfoModal = ({ isOpen, onClose, meetingUrl} : Props) => {

    const [copied, setCopied] = React.useState(false)
    const copyMeetingUrl = async() => {
        try {
            await navigator.clipboard.writeText(meetingUrl)
            toast.success("Meeting url copied")
            setCopied(true)
            setTimeout(() => {
                setCopied(false)
            }, 2000)
        } catch (error) {
            console.error("Error copying meeting url", error)
            toast.error("Error copying meeting url")
        }
    }
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Meeting details</DialogTitle>
                    <DialogDescription>
                        Share this information with your participants to join the meeting.
                    </DialogDescription>
                </DialogHeader>
                <div className='space-y-6 py-4'>
                    <div className='space-y-2'>
                        <Label htmlFor='meeting-url' className="text-sm font-medium">
                            Meeting link
                        </Label>
                        <div className='flex items-center space-x-2'>
                            <Input 
                                id='meeting-url'
                                value={meetingUrl}
                                readOnly
                                className='flex-1'
                            />
                            <Button
                                variant={"outline"}
                                size={"icon"}
                                onClick={copyMeetingUrl}
                            >
                                {copied ? (
                                    <Check className='size-4' />
                                    ) : (
                                    <Copy className='size-4' />
                                )}
                            </Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>

    )
}

export default MeetingInfoModal