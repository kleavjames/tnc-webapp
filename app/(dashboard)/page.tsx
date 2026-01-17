"use client"

import { Header } from "@/components/header"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { formatDistanceToNow } from "date-fns"

export default function DashboardPage() {
  const users = useQuery(api.users.listUsers);
  const latestTimes = useQuery(api.users.getLatestUpdateTimes);

  if (users === undefined) {
    return (
      <>
        <Header title="Dashboard" />
        <div className="flex flex-1 flex-col gap-4 p-4">
          <p>Loading...</p>
        </div>
      </>
    );
  }

  const maleUsers = users.filter((user) => user.gender === "male");
  const femaleUsers = users.filter((user) => user.gender === "female");
  const leaders = users.filter((user) => user.isALeader);

  return (
    <>
    <Header title="Dashboard" />
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 p-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:p-4 sm:grid-cols-2">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Users</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {users.length}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            These are the church members
          </div>
          <div className="text-muted-foreground text-xs">
            {latestTimes?.all
              ? "Last updated " + formatDistanceToNow(latestTimes.all, { addSuffix: true })
              : "No updates yet"}
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Leaders</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {leaders.length}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            These are the members who are leaders
          </div>
          <div className="text-muted-foreground text-xs">
            {latestTimes?.all
              ? "Last updated " + formatDistanceToNow(latestTimes.all, { addSuffix: true })
              : "No updates yet"}
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Female Users</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {femaleUsers.length}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Users who are female
          </div>
          <div className="text-muted-foreground text-xs">
            {latestTimes?.female
              ? "Last updated " + formatDistanceToNow(latestTimes.female, { addSuffix: true })
              : "No updates yet"}
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Male Users</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {maleUsers.length}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Users who are male
          </div>
          <div className="text-muted-foreground text-xs">
            {latestTimes?.male
              ? "Last updated " + formatDistanceToNow(latestTimes.male, { addSuffix: true })
              : "No updates yet"}
          </div>
        </CardFooter>
      </Card>
    </div>
    </>
  )
}
