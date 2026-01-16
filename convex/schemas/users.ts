import { defineTable } from "convex/server";
import { v } from "convex/values";

export const usersTable = defineTable({
  firstName: v.string(),
  lastName: v.string(),
  mobileNumber: v.string(),
  gender: v.union(v.literal("male"), v.literal("female"), v.literal("other")),
  isALeader: v.boolean(),
}).index("by_firstName", ["firstName"]);
