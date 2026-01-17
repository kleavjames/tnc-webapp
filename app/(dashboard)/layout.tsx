'use client'

import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { useAuth } from "@/hooks/use-auth"
import { redirect } from "next/navigation"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth()

  // Only redirect if we're done loading and there's no user
  if (!isLoading && !user) {
    redirect("/login")
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}