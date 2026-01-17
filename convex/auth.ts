import { query, mutation, internalMutation } from "./_generated/server";
import { v } from "convex/values";
import bcrypt from "bcryptjs";

const SALT_ROUNDS = 10;

// Use sync versions - Convex doesn't allow setTimeout used by async bcrypt
function hashPassword(password: string): string {
  return bcrypt.hashSync(password, SALT_ROUNDS);
}

function verifyPassword(password: string, hash: string): boolean {
  return bcrypt.compareSync(password, hash);
}

function generateToken(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, (b) => b.toString(16).padStart(2, "0")).join("");
}

export const login = mutation({
  args: {
    username: v.string(),
    password: v.string(),
  },
  handler: async (ctx, args) => {
    const account = await ctx.db
      .query("accounts")
      .withIndex("by_username", (q) => q.eq("username", args.username))
      .unique();

    if (!account) {
      throw new Error("Invalid username or password");
    }

    const isValidPassword = verifyPassword(args.password, account.passwordHash);
    if (!isValidPassword) {
      throw new Error("Invalid username or password");
    }

    // Create session (expires in 2 hours)
    const token = generateToken();
    const expiresAt = Date.now() + 2 * 60 * 60 * 1000;

    await ctx.db.insert("sessions", {
      accountId: account._id,
      token,
      expiresAt,
    });

    return { token, username: account.username };
  },
});

export const logout = mutation({
  args: { token: v.string() },
  handler: async (ctx, args) => {
    const session = await ctx.db
      .query("sessions")
      .withIndex("by_token", (q) => q.eq("token", args.token))
      .unique();

    if (session) {
      await ctx.db.delete(session._id);
    }
  },
});

export const validateSession = query({
  args: { token: v.string() },
  handler: async (ctx, args) => {
    if (!args.token) return null;

    const session = await ctx.db
      .query("sessions")
      .withIndex("by_token", (q) => q.eq("token", args.token))
      .unique();

    if (!session || session.expiresAt < Date.now()) {
      return null;
    }

    const account = await ctx.db.get(session.accountId);
    if (!account) return null;

    return {
      id: account._id,
      username: account.username,
    };
  },
});

export const createAccount = mutation({
  args: {
    username: v.string(),
    password: v.string(),
  },
  handler: async (ctx, args) => {
    // Check if username already exists
    const existing = await ctx.db
      .query("accounts")
      .withIndex("by_username", (q) => q.eq("username", args.username))
      .unique();

    if (existing) {
      throw new Error("Username already exists");
    }

    const passwordHash = hashPassword(args.password);
    const now = Date.now();

    await ctx.db.insert("accounts", {
      username: args.username,
      passwordHash,
      createdAt: now,
    });

    return { success: true };
  },
});

// To create your initial admin account, run the following in your terminal:
// npx convex run auth:seedAdmin
// IMPORTANT: Before running this, edit the seedAdmin mutation to set your desired username and password for the initial account!
// This is the only supported way to create the first user, since registration is otherwise disabled.
export const seedAdmin = mutation({
  args: {},
  handler: async (ctx) => {
    const existing = await ctx.db
      .query("accounts")
      .withIndex("by_username", (q) => q.eq("username", "admin"))
      .unique();

    if (existing) {
      return { message: "Admin already exists" };
    }

    const passwordHash = hashPassword("2352620"); // Change this password!
    await ctx.db.insert("accounts", {
      username: "admin",
      passwordHash,
      createdAt: Date.now(),
    });

    return { message: "Successfully created administrator account" };
  },
});

// Internal mutation for scheduled cleanup - runs weekly via cron
export const cleanupExpiredSessions = internalMutation({
  args: {},
  handler: async (ctx) => {
    const now = Date.now();
    const sessions = await ctx.db.query("sessions").collect();

    let deletedCount = 0;
    for (const session of sessions) {
      if (session.expiresAt < now) {
        await ctx.db.delete(session._id);
        deletedCount++;
      }
    }

    console.log(`Cleaned up ${deletedCount} expired sessions`);
    return { deletedCount };
  },
});
