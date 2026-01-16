'use client'

import { createContext, useState, useEffect } from "react"

const AuthContext = createContext<{
  user: any
  isLoading: boolean
} | undefined>(undefined)

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // FIXME: Implement auth provider
  const [user, setUser] = useState<any>({
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
  })
  const [isLoading, setIsLoading] = useState(false)

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