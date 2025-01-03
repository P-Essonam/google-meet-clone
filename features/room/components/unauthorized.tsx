import { Button } from '@/components/ui/button'
import { AlertTriangle, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import React from 'react'


const domain = process.env.NEXT_PUBLIC_BASE_URL

const Unauthorized = () => {
  return (
    <div className='flex items-center justify-center min-h-screen'>
        <div className='max-w-md w-full px-6 py-8'>
            <div className='flex flex-col items-center text-center'>
                <AlertTriangle className='size-16 mb-6 text-yellow-500' />
                <h1 className='text-2xl font-bold mb-4'>
                    Unauthorized
                </h1>
                <p className='text-muted-foreground mb-6'>
                    Please Check you have entered the correct meeting code in the URL.
                </p>
                <div className='p-4 rounded-md mb-6'>
                    <p className='text-sm'>
                        Example: {`${domain}/xxx-yyyy-zzz`}
                    </p>
                </div>
                <Button variant={"outline"} asChild>
                    <Link href={'/'} className='inline-flex items-center'>
                        <ArrowLeft className='size-4 mr-2' />
                        Return to home
                    </Link>
                </Button>
            </div>
        </div>
    </div>
  )
}

export default Unauthorized