import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getUser = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.userId);
  },
});

export const listUsers = query({
  handler: async (ctx) => {
    return await ctx.db.query("users").collect();
  },
});

export const createUser = mutation({
  args: {
    firstName: v.string(),
    lastName: v.optional(v.string()),
    mobileNumber: v.string(),
    gender: v.union(v.literal("male"), v.literal("female")),
    isALeader: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("users", {
      ...args,
      lastName: args.lastName ?? "",
      isALeader: args.isALeader ?? false,
    });
  },
});

export const deleteUser = mutation({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.userId);
  },
});