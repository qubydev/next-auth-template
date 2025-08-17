import React from 'react'
import { auth, signOut } from '@/auth'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import NavbarClient from './client'

export default async function Navbar() {
  const session = await auth()

  return (
    <div className='h-16 flex items-center px-6 border-b gap-2'>
      <h1 className='font-bold'>navbar</h1>
      <div className='flex-1'></div>
      {session ? (
        <>
          <NavbarClient />
          <DropdownMenu>
            <DropdownMenuTrigger className="rounded-full">
              <Avatar>
                <AvatarImage src={session.user.image} />
                <AvatarFallback>
                  {session.user.name.split(" ").filter(Boolean).map((w, i, a) => (i === 0 || i === a.length - 1) ? w[0].toUpperCase() : "").join("")}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuLabel>
                <p>{session.user.name}</p>
                <p className='font-normal'>{session.user.email}</p>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <form
                action={async () => {
                  "use server"
                  await signOut()
                }}
              >
                <Button type="submit" className="w-full" variant="destructive">Sign out</Button>
              </form>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      ) : (
        <Link href="/signin">
          <Button type="submit">Login</Button>
        </Link>
      )}
    </div>
  )
}
