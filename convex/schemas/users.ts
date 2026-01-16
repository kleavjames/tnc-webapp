import { defineTable } from "convex/server";
import { v } from "convex/values";

export const usersTable = defineTable({
  firstName: v.string(),
  lastName: v.optional(v.string()),
  mobileNumber: v.optional(v.string()),
  gender: v.union(v.literal("male"), v.literal("female")),
  isALeader: v.optional(v.boolean()),
}).index("by_firstName", ["firstName"]);
