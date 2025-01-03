import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Logo = () => {
  return (
    <Link 
        href="/dashboard"
        className='font-normal flex space-x-2 items-center text-sm py-1 relative z-20'
    >
        <Image 
            src={'/logo.svg'}
            alt="Logo"
            width={40}
            height={40}
            className='h-12 w-12 flex-shrink-0 rounded-full'
        />
        <span className='font-medium whitespace-pre text-lg'>
            GMeet
        </span>
    </Link>
  )
}

export default Logo