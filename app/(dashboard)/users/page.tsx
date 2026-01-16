"use client"

import { Header } from "@/components/header";
import { DataTable } from "../../../components/data-table";
import { columns } from "./columns";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { UserRoundPlus } from "lucide-react";
import Link from "next/link";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";

export default function UsersPage() {
  const users = useQuery(api.users.listUsers);
  const latestTimes = useQuery(api.users.getLatestUpdateTimes);

  const maleUsers = users?.filter((user) => user.gender === "male") ?? [];
  const femaleUsers = users?.filter((user) => user.gender === "female") ?? [];

  // Handle loading state
  if (users === undefined) {
    return (
      <>
        <Header title="Users" />
        <div className="flex flex-1 flex-col gap-4 p-4">
          <p>Loading...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Header title="Users" />
      <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
      <Card>
        <CardHeader>
          <CardDescription>Total Users</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {users?.length ?? 0}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Users who are part in the church
          </div>
          <div className="text-muted-foreground text-xs">
            {latestTimes?.all
              ? "Last updated " + formatDistanceToNow(latestTimes.all, { addSuffix: true })
              : "No updates yet"}
          </div>
        </CardFooter>
      </Card>
      <Card>
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
      <Card>
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
      <div className="flex justify-end">
      <Button variant="outline" asChild>
        <Link href="/users/add">
          <UserRoundPlus className="size-4" />
          Add User
        </Link>
      </Button>
      </div>
      <DataTable columns={columns} data={users} />
    </div>
    </>
  );
}
