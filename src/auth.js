import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import NeonAdapter from "@auth/neon-adapter"
import { Pool } from "@neondatabase/serverless"

export const { handlers, signIn, signOut, auth } = NextAuth(() => {
  // const pool = new Pool({ connectionString: process.env.DATABASE_URL })

  return {
    // adapter: NeonAdapter(pool), <-- i ain't want to use database, it works without db too. use if you need.
    providers: [GitHub],
    callbacks: {
      authorized: async ({ auth }) => !!auth,
    },
    pages: {
      signIn: '/signin'
    }
  }
})
