'use client'

import { createContext, useState, useCallback, useMemo, useEffect } from "react"
import { useMutation, useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"

const SESSION_KEY = "tnc_session_token"

type User = {
  id: string
  username: string
} | null

type AuthContextType = {
  user: User
  isLoading: boolean
  login: (username: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null)
  const [hasHydrated, setHasHydrated] = useState(false)

  // Load token from localStorage after hydration
  useEffect(() => {
    const storedToken = localStorage.getItem(SESSION_KEY)
    setToken(storedToken)
    setHasHydrated(true)
  }, [])

  const loginMutation = useMutation(api.auth.login)
  const logoutMutation = useMutation(api.auth.logout)
  const sessionData = useQuery(
    api.auth.validateSession,
    token ? { token } : "skip"
  )

  // Memoize user object to prevent unnecessary re-renders
  const user: User = useMemo(() => {
    if (!sessionData) return null
    return {
      id: sessionData.id,
      username: sessionData.username,
    }
  }, [sessionData])

  const login = useCallback(async (username: string, password: string) => {
    const result = await loginMutation({ username, password })
    localStorage.setItem(SESSION_KEY, result.token)
    setToken(result.token)
  }, [loginMutation])

  const logout = useCallback(async () => {
    const currentToken = localStorage.getItem(SESSION_KEY)
    if (currentToken) {
      await logoutMutation({ token: currentToken })
      localStorage.removeItem(SESSION_KEY)
      setToken(null)
    }
  }, [logoutMutation])

  // Loading if: not hydrated yet OR (has token but waiting for session validation)
  const isLoading = !hasHydrated || (token !== null && sessionData === undefined)

  // Memoize context value to prevent unnecessary re-renders in consumers
  const contextValue = useMemo<AuthContextType>(() => ({
    user,
    isLoading,
    login,
    logout,
  }), [user, isLoading, login, logout])

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  )
}

export {
  AuthContext,
  AuthProvider,
}
