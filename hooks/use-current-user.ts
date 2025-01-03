import { useSession } from 'next-auth/react'

export default function useCurrentUser() {
    const session = useSession()

    return session.data?.user
}