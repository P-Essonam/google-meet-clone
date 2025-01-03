"use client";

import React from 'react'
import useCurrentUser from '@/hooks/use-current-user';
import { redirect } from 'next/navigation';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


const ParticipantPlaceholder = () => {

    const user = useCurrentUser()
    if (!user) return redirect('/')

    return (
        <Avatar className='size-32'>
            <AvatarImage 
                src={user.image || undefined} 
            />
            <AvatarFallback className='text-white text-7xl font-bold bg-[#AB47BC]'>
                {user.name?.charAt(0).toUpperCase()}
            </AvatarFallback>
        </Avatar>

    )
}

export default ParticipantPlaceholder