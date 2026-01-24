import { defineTable } from "convex/server";
import { v } from "convex/values";

export const glcTable = defineTable({
  level: v.number(),
  book: v.number(),
  bookTitle: v.string(),
  createdAt: v.number(),
  updatedAt: v.number(),
})
