'use client'

import { useAuth } from "@/hooks/use-auth"
import { SidebarTrigger } from "./ui/sidebar"
import { Skeleton } from "./ui/skeleton"

interface Props {
    title: string
}

export const Header = ({ title }: Props) => {
    const { user, isLoading } = useAuth()

    return (
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <h1 className="text-xl font-semibold">{title}</h1>
          
          <div className="ml-auto flex items-center gap-3">
            {isLoading ? (
              <Skeleton className="h-8 w-24" />
            ) : user ? (
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium">
                  {user.username.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm font-medium">{user.username}</span>
              </div>
            ) : null}
          </div>
        </header>
    )
}