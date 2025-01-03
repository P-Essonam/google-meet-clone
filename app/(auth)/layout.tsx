import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import React from 'react'


interface Props {
    children: React.ReactNode
}

const layout = ({ children } : Props) => {
  return (
    <div className='w-full h-full flex flex-col'>
        <Button variant={"outline"} className='mr-auto' asChild>
            <Link href={"/"} className='inline-flex items-center ml-4 mt-4'>
                <ArrowLeft className='w-4 h-4 mr-2'/>
                Back
            </Link>
        </Button>
        <div className='flex-1 flex justify-center items-center p-4'>
            {children}
        </div>
    </div>
  )
}

export default layout