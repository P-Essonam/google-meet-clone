import * as React from "react"


import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { TbBrandTabler } from "react-icons/tb"
import { MdOutlineVideocam } from "react-icons/md"
import Link from "next/link"
import Logo from "./logo"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronUp, LogOut, Trash } from "lucide-react"
import Image from "next/image"
import logout from "@/lib/logout"
import DeleteAccountModal from "@/features/user/components/delete-account-modal"



// This is sample data.
const items = [
  {
    label: "Dashboard",
    url: "/dashboard",
    icon: TbBrandTabler,
  },
  {
    label: "Join meeting",
    url: "/join-meeting",
    icon: MdOutlineVideocam,
  },
]

export function AppSidebar() {

  const [open, setOpen] = React.useState(false)
  return (
    <>
      <Sidebar >
        <SidebarContent>
              <SidebarGroup>
                  <Logo />
                  <SidebarGroupContent className="mt-4">
                    <SidebarMenu>
                      {items.map((item, index) => (
                        <SidebarMenuItem key={index}>
                          <SidebarMenuButton asChild size={"lg"}>
                            <Link href={item.url}>
                              <item.icon className="w-5 h-5 flex-shrink-0 text-neutral-700" />
                              <span>{item.label}</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
              </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton>
                    <Image 
                      src="/logo.svg"
                      alt="Logo"
                      width={50}
                      height={50}
                      className="rounded-full h-7 w-7 flex-shrink-0"
                    /> Username
                    <ChevronUp className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-[--radix-popper-anchor-width] z-[200]"
                >
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={async() => {
                      await logout()
                    }}
                  >
                    <LogOut />
                    Logout
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="text-destructive cursor-pointer"
                    onClick={async() => {
                      setOpen(true)
                    }}
                  >
                    <Trash />
                    Delete account
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      {open && 
        <DeleteAccountModal open={open} setOpen={setOpen} />
      }
    </>
  )
}
