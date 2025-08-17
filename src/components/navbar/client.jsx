"use client"

import React from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Button } from '../ui/button'

export default function NavbarClient() {
    const pathname = usePathname()

    return (
        <>
            {pathname === "/" && (
                <Link href="/dashboard">
                    <Button>Dashboard</Button>
                </Link>
            )}
        </>
    )
}