import { defineTable } from "convex/server";
import { v } from "convex/values";

export const accountsTable = defineTable({
  username: v.string(),
  passwordHash: v.string(),
  createdAt: v.number(),
}).index("by_username", ["username"]);

export const sessionsTable = defineTable({
  accountId: v.id("accounts"),
  token: v.string(),
  expiresAt: v.number(),
}).index("by_token", ["token"]);
