import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getGlc = query({
  args: { glcId: v.id("glc") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.glcId);
  },
});

export const listGlc = query({
  handler: async (ctx) => {
    return await ctx.db.query("glc").collect();
  },
});

export const listGlcByLevel = query({
  args: { level: v.number() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("glc")
      .filter((q) => q.eq(q.field("level"), args.level))
      .collect();
  },
});

export const listGlcByBook = query({
  args: { book: v.number() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("glc")
      .filter((q) => q.eq(q.field("book"), args.book))
      .collect();
  },
});

export const createGlc = mutation({
  args: {
    level: v.number(),
    book: v.number(),
    bookTitle: v.string(),
    session: v.number(),
    sessionTitle: v.string(),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    return await ctx.db.insert("glc", {
      ...args,
      createdAt: now,
      updatedAt: now,
    });
  },
});

export const updateGlc = mutation({
  args: {
    glcId: v.id("glc"),
    level: v.optional(v.number()),
    book: v.optional(v.number()),
    bookTitle: v.optional(v.string()),
    session: v.optional(v.number()),
    sessionTitle: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { glcId, ...updates } = args;
    const filteredUpdates = Object.fromEntries(
      Object.entries(updates).filter(([, value]) => value !== undefined)
    );
    await ctx.db.patch(glcId, {
      ...filteredUpdates,
      updatedAt: Date.now(),
    });
  },
});

export const deleteGlc = mutation({
  args: { glcId: v.id("glc") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.glcId);
  },
});
