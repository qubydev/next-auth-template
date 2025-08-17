import React from 'react'
import { signIn, auth } from '@/auth'
import { Button } from '@/components/ui/button'
import { redirect } from 'next/navigation'

export default async function Page({ searchParams }) {
  const resolvedSearchParams = await searchParams
  const callbackUrl = resolvedSearchParams.callbackUrl || '/dashboard'
  const session = await auth()

  if (session) {
    redirect(callbackUrl)
  }

  return (
    <div className='flex items-center justify-center h-screen'>
      <div>
        <h1 className='text-2xl font-bold mb-4'>Welcome to Whispy</h1>
        <p className='mb-4'>Please login to continue.</p>
        <form
          action={async () => {
            "use server"
            await signIn("github", {
              redirectTo: callbackUrl
            })
          }}
        >
          <Button type="submit">Login with Github</Button>
        </form>
      </div>
    </div>
  )
}
