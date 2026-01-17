"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Doc } from "@/convex/_generated/dataModel"
import { Check, X, Mars, Venus } from "lucide-react"

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
    cell: ({ row }) => {
      const gender = row.getValue("gender")
      return gender === "male" ? (
        <Mars className="h-5 w-5 text-blue-500" />
      ) : (
        <Venus className="h-5 w-5 text-pink-500" />
      )
    },
  },
  {
    accessorKey: "isALeader",
    header: "A Leader",
    cell: ({ row }) => {
      const isLeader = row.getValue("isALeader")
      return isLeader ? (
        <Check className="h-5 w-5 text-green-500" />
      ) : (
        <X className="h-5 w-5 text-red-500" />
      )
    },
  },
]
