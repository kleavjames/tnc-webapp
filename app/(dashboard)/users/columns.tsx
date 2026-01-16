"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Doc } from "@/convex/_generated/dataModel"

// Use the Convex document type for type safety
export type User = Doc<"users">

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "firstName",
    header: "First Name",
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
  },
  {
    accessorKey: "mobileNumber",
    header: "Mobile Number",
  },
  {
    accessorKey: "gender",
    header: "Gender",
  },
  {
    accessorKey: "isALeader",
    header: "Is A Leader",
  },
]
