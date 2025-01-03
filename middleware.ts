import NextAuth from "next-auth"
import authConfig from "./auth.config"
import { apiauthPrefix, authRoutes, DEFAULT_REDIRECT, publicRoutes } from "@/routes"
import { NextResponse } from "next/server"
 
const { auth } = NextAuth(authConfig)
export default auth(async function middleware(req) {
  
    const { nextUrl } = req
    const isLoggedIn = !!req.auth

    const isPublicRoutes = publicRoutes.includes(nextUrl.pathname)
    const isAuthRoutes = authRoutes.includes(nextUrl.pathname)
    const isApiAuthPrefix = nextUrl.pathname.startsWith(apiauthPrefix)


    if (isApiAuthPrefix) {
        return
    }

    if (isAuthRoutes) {
        if (isLoggedIn) {
            return NextResponse.redirect(new URL(DEFAULT_REDIRECT, nextUrl))
        }
        return 
    }

    if (!isLoggedIn && !isPublicRoutes && !isAuthRoutes) {
        let callbackUrl = nextUrl.pathname
        if (nextUrl.search) {
            callbackUrl += nextUrl.search
        }

        const encodedCallbackUrl = encodeURIComponent(callbackUrl)

        return NextResponse.redirect(new URL(`/sign-in?callbackUrl=${encodedCallbackUrl}`, nextUrl))
    }
})


export const config = {
    matcher: [
      // Skip Next.js internals and all static files, unless found in search params
      '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
      // Always run for API routes
      '/(api|trpc)(.*)',
    ],
}