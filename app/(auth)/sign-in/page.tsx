"use client";

import React from 'react'
import { Button } from '@/components/ui/button'
import { FcGoogle } from 'react-icons/fc'
import { FaExclamationCircle, FaGithub } from 'react-icons/fa';
import { useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { DEFAULT_REDIRECT } from '@/routes';

const Page = () => {

    const searchParams = useSearchParams()
    const callbackUrl = searchParams.get("callbackUrl")
    const urlError = searchParams.get("error") === "OAuthAccountNotLinked" ? 
        "Account not linked, please sign in with the same provider you used to sign up" : null
    const [isPending, setIsPending] = React.useState(false)
    const onClick = (provider: "google" | "github") => {
        signIn(provider, {
            redirectTo: callbackUrl || DEFAULT_REDIRECT
        })
    }

    return (
        <div className='max-w-[400px] w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input'>
            <h2 className='font-bold text-2xl'>
                Welcome to G-Meet
            </h2>
            <p className='text-sm max-w-sm mt-2'>
                Login to google meet if you can becasue we don&apos;t have a login flow yet.
            </p>
            
            <div className='my-8'>
                {
                    urlError && (
                        <div className='bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive'>
                            <FaExclamationCircle className='w-4 h-4'/>
                            <p>
                                {urlError}
                            </p>
                        </div>
                    )
                }
                <div className='bg-gradient-to-r from-transparent via-neutral-300 to-transparent my-8 h-[1px] w-full'/>
                <div className='flex flex-col space-y-4'>
                    <Button
                        className='w-full h-12 font-medium px-4'
                        variant={"outline"}
                        type='button'
                        onClick={() => {
                            setIsPending(true)
                            onClick("github")
                        }}
                        disabled={isPending}
                    >
                        <FaGithub className='w-4 h-4'/>
                        <span className='text-foreground/80 text-sm'>
                            Sign in with Github
                        </span>
                    </Button>
                    <Button
                        className='w-full h-12 font-medium px-4'
                        variant={"outline"}
                        type='button'
                        onClick={() => {
                            setIsPending(true)
                            onClick("google")
                        }}
                        disabled={isPending}
                    >
                        <FcGoogle className='w-4 h-4'/>
                        <span className='text-foreground/80 text-sm'>
                            Sign in with Google
                        </span>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Page