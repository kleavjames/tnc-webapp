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

export const getLatestUpdateTimes = query({
  handler: async (ctx) => {
    const [latest, latestMale, latestFemale] = await Promise.all([
      ctx.db.query("users").withIndex("by_updatedAt").order("desc").first(),
      ctx.db
        .query("users")
        .withIndex("by_gender_updatedAt", (q) => q.eq("gender", "male"))
        .order("desc")
        .first(),
      ctx.db
        .query("users")
        .withIndex("by_gender_updatedAt", (q) => q.eq("gender", "female"))
        .order("desc")
        .first(),
    ]);

    return {
      all: latest?.updatedAt ?? null,
      male: latestMale?.updatedAt ?? null,
      female: latestFemale?.updatedAt ?? null,
    };
  },
});

export const createUser = mutation({
  args: {
    firstName: v.string(),
    lastName: v.optional(v.string()),
    mobileNumber: v.optional(v.string()),
    gender: v.union(v.literal("male"), v.literal("female")),
    isALeader: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    return await ctx.db.insert("users", {
      ...args,
      lastName: args.lastName ?? "",
      mobileNumber: args.mobileNumber ?? "",
      isALeader: args.isALeader ?? false,
      createdAt: now,
      updatedAt: now,
    });
  },
});

export const updateUser = mutation({
  args: {
    userId: v.id("users"),
    firstName: v.optional(v.string()),
    lastName: v.optional(v.string()),
    mobileNumber: v.optional(v.string()),
    gender: v.optional(v.union(v.literal("male"), v.literal("female"))),
    isALeader: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const { userId, ...updates } = args;
    const filteredUpdates = Object.fromEntries(
      Object.entries(updates).filter(([, value]) => value !== undefined)
    );
    await ctx.db.patch(userId, {
      ...filteredUpdates,
      updatedAt: Date.now(),
    });
  },
});

export const deleteUser = mutation({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.userId);
  },
});