"use client"

import { Header } from "@/components/header";
import { DataTable } from "../../../components/data-table";
import { columns } from "./columns";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { PlusIcon, UserRoundPlus } from "lucide-react";
import Link from "next/link";

export default function UsersPage() {
  const users = useQuery(api.users.listUsers);

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
