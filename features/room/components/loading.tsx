import React from 'react'


interface Props {
    title: string
}


const Loading = ({ title } : Props) => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen overflow-hidden'>
        <div className='text-center'>
            <div className='relative mb-24'>
                <div className='absolute inset-0 flex items-center justify-center animate-ping'>
                    <div className='size-16 bg-blue-500 rounded-full opacity-75'/>
                </div>
            </div>

            <h1 className='mb-4 text-3xl font-bold text-gray-800'>
                {title}
            </h1>
            <p className='mb-8 text-gray-600'>
                This won&apos;t take long. We&apos;re setting up your room.
            </p>
            <div className='w-64 h-2 mx-auto mb-4 bg-gray-200 rounded-full'>
                <div className='h-2 bg-blue-500 rounded-full'/>
            </div>
            <p className='text-sm text-gray-600'>
                Initializing video and audio...
            </p>
        </div>
    </div>
  )
}

export default Loading