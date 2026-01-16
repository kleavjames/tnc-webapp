"use client"

import { Header } from "@/components/header";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function UsersPage() {
  const users = useQuery(api.users.listUsers);

  // Handle loading state
  if (users === undefined) {
    return (
      <>
        <Header title="Users" />
        <div className="container mx-auto py-10">
          <p>Loading...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Header title="Users" />
      <div className="flex flex-1 flex-col gap-4 p-4">
      <DataTable columns={columns} data={users} />
    </div>
    </>
  );
}
