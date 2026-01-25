import { defineTable } from "convex/server";
import { v } from "convex/values";

export const glcTable = defineTable({
  bookNumber: v.float64(),
  bookTitle: v.string(),
  id: v.string(),
  level: v.float64(),
  sessions: v.array(
    v.object({
      id: v.string(),
      sessionNumber: v.float64(),
      sessionSubtitle: v.string(),
      sessionTitle: v.string(),
    })
  ),
})
  .index("by_level", ["level"])
  .index("by_bookNumber", ["bookNumber"])
  .index("by_level_bookNumber", ["level", "bookNumber"]);