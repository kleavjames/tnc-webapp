"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Doc } from "@/convex/_generated/dataModel"

// Use the Convex document type for type safety
export type Glc = Doc<"glc">

export const columns: ColumnDef<Glc>[] = [
  {
    accessorKey: "level",
    header: "Level",
  },
  {
    accessorKey: "book",
    header: "Book",
  },
  {
    accessorKey: "bookTitle",
    header: "Book Title",
  },
]
