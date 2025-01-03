"use server"

import currentUser from "@/lib/auth"
import { db } from "@/lib/db"


export const deleteAccount = async () => {
    try {
        const authUser = await currentUser()
        if (!authUser) {
            throw new Error("You must be logged in to delete your account.")
        }
        const user = await db.user.delete({
            where: {
                id: authUser.id
            }
        })
        return user
    } catch (error) {
        console.error("deleteAccount: ",error)
        throw new Error("An error occurred. Please try again.")
    }
}