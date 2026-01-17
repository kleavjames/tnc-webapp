'use client'

import { createContext, useState, useCallback, useMemo, useEffect } from "react"
import { useMutation, useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"

const SESSION_KEY = "tnc_session_token"
const USER_KEY = "tnc_user"

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
  const [cachedUser, setCachedUser] = useState<User>(null)
  const [hasHydrated, setHasHydrated] = useState(false)

  // Load token and cached user from localStorage after hydration
  useEffect(() => {
    const storedToken = localStorage.getItem(SESSION_KEY)
    const storedUser = localStorage.getItem(USER_KEY)
    
    setToken(storedToken)
    if (storedUser) {
      try {
        setCachedUser(JSON.parse(storedUser))
      } catch {
        setCachedUser(null)
      }
    }
    setHasHydrated(true)
  }, [])

  const loginMutation = useMutation(api.auth.login)
  const logoutMutation = useMutation(api.auth.logout)
  const sessionData = useQuery(
    api.auth.validateSession,
    token ? { token } : "skip"
  )

  // Update cached user when session data changes
  useEffect(() => {
    if (sessionData) {
      const userData = {
        id: sessionData.id,
        username: sessionData.username,
      }
      setCachedUser(userData)
      localStorage.setItem(USER_KEY, JSON.stringify(userData))
    } else if (sessionData === null) {
      // Session explicitly invalid (not just loading)
      setCachedUser(null)
      localStorage.removeItem(USER_KEY)
    }
  }, [sessionData])

  // Use cached user if sessionData is undefined (loading), otherwise use sessionData
  const user: User = useMemo(() => {
    if (sessionData) {
      return {
        id: sessionData.id,
        username: sessionData.username,
      }
    }
    // Return cached user while loading, null if session explicitly invalid
    return sessionData === undefined ? cachedUser : null
  }, [sessionData, cachedUser])

  const login = useCallback(async (username: string, password: string) => {
    const result = await loginMutation({ username, password })
    
    // Cache user immediately so redirect works
    const userData = { id: result.id, username: result.username }
    localStorage.setItem(SESSION_KEY, result.token)
    localStorage.setItem(USER_KEY, JSON.stringify(userData))
    setToken(result.token)
    setCachedUser(userData)
  }, [loginMutation])

  const logout = useCallback(async () => {
    const currentToken = localStorage.getItem(SESSION_KEY)
    if (currentToken) {
      await logoutMutation({ token: currentToken })
      localStorage.removeItem(SESSION_KEY)
      localStorage.removeItem(USER_KEY)
      setToken(null)
      setCachedUser(null)
    }
  }, [logoutMutation])

  // Only loading during initial hydration
  const isLoading = !hasHydrated

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
