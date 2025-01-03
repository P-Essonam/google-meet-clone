"use client"

import React from 'react'
import Image from 'next/image'
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu"
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
  
import Link from 'next/link'
import { Button } from './ui/button'
import { Menu } from 'lucide-react'
import useCurrentUser from '@/hooks/use-current-user'
  

const navItems = ["Home", "About", "Services", "Contact"]

const Header = () => {
    const [isOpen, setIsOpen] = React.useState(false)
    const user = useCurrentUser()
    
    return (
        <header className='sticky top-4 z-50 w-full px-4 sm:px-6 lg:px-8'>
            <div className='flex max-w-xl mx-auto items-center justify-between'>
                <Image 
                    src={"/logo.svg"}
                    alt='Logo'
                    width={50}
                    height={50}
                    className='cursor-pointer'
                />
                <NavigationMenu className='hidden md:block'>
                    <NavigationMenuList className='gap-1 rounded-full bg-background shadow-sm px-2 py-1'>
                        {navItems.map((item, index) => (
                            <NavigationMenuItem key={index}>
                                <NavigationMenuLink
                                    asChild
                                    className='group inline-flex h-9 w-max items-center justify-center rounded-full bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground'
                                >
                                    <Link href={"#"}>
                                        {item}
                                    </Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        ))}
                    </NavigationMenuList>
                </NavigationMenu>
                <div className='hidden md:flex items-center gap-2'>
                    <Link href={user ? '/dashboard' : '/sign-in'}>
                        <Button
                            className='rounded-full'
                            variant={"outline"}
                        >
                            {user ? 'Go to Dashboard' : 'Get Started'}
                        </Button>
                    </Link>
                </div>
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild>
                        <Button
                            variant={"ghost"}
                            size={"icon"}
                            className='md:hidden'
                        >
                            <Menu className='w-6 h-6'/>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side={"right"} className='w-64'>
                        <nav className='flex flex-col space-y-4 mt-8'>
                            {navItems.map((item, index) => (
                                <Link 
                                    href={"#"} 
                                    key={index}
                                    className='text-lg font-medium hover:text-primary'
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item}
                                </Link>
                            ))}
                            <Link href={"/sign-in"}>
                                <Button
                                    className='w-full mt-4 rounded-full'
                                    variant={"outline"}
                                >
                                    Sign In
                                </Button>
                            </Link>
                        </nav>
                    </SheetContent>
                </Sheet>

            </div>

        </header>
    )
}

export default Header