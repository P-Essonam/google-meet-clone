"use server"

import { signOut } from "@/auth";

export default async function logout() {
    // some logic to sign out
    await signOut({
        redirectTo: "/",
    })
}