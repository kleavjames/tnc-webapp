'use client'

import { createContext, useState, useEffect } from "react"
import { createClient } from "@/supabase/client"

const AuthContext = createContext<{
  user: any
  isLoading: boolean
} | undefined>(undefined)

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    createClient().auth.getSession().then(({ data }) => {
      setUser(data?.session?.user ?? null)
      setIsLoading(false)
    })

    const { data: listener } = createClient().auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null)
      setIsLoading(false)
    })

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  return (
    <AuthContext.Provider
        value={{
            user,
            isLoading,
        }}
    >
        {children}
    </AuthContext.Provider>
  )
}

export {
    AuthContext,
    AuthProvider,
}