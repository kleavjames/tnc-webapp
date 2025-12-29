'use client'

import { useAuth } from "@/hooks/use-auth";
import { redirect, RedirectType } from "next/navigation";

export default function Home() {
  const { user, isLoading } = useAuth()

  if (user && !isLoading) {
    redirect("/dashboard", RedirectType.replace);
  }

  redirect("/login", RedirectType.replace);
}
