'use client'

import { createContext, useState, useEffect } from "react"

const AuthContext = createContext<{
  user: any
  isLoading: boolean
} | undefined>(undefined)

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // TODO: Implement auth provider
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