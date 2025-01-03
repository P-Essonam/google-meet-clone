import React from 'react'
import RoomProvider from '@/features/room/provider/room-provider'
import currentUser from '@/lib/auth'
import { redirect } from 'next/navigation'

interface Props {
    children: React.ReactNode
}


const Layout = async({ children } : Props) => {
    const user = await currentUser()
    if (!user || !user.id || !user.image || !user.name) return redirect('/')

    return (
        <RoomProvider user={{id: user.id, name: user.name, image: user.image}}>
            {children}
        </RoomProvider>
    )
}

export default Layout