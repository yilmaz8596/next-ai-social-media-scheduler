import { internalMutation, mutation, query, QueryCtx } from "./_generated/server";
import { v, Validator } from "convex/values";

export const list = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];
    return await ctx.db.query("socialAccounts").withIndex("by_userId", (q) => q.eq("userId", identity.subject)).collect();
  },
});

export const upsert = mutation({
  args: {
    platform: v.string(),
    accountName: v.string(),
    accountHandle: v.string(),
    avatarUrl: v.optional(v.string()),
    accessToken: v.optional(v.string()),
    refreshToken: v.optional(v.string()),
    expiresAt: v.optional(v.number()),
    scopes: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const existing = await ctx.db
      .query("socialAccounts")
      .withIndex("by_userId_and_platform", (q) => q.eq("userId", identity.subject).eq("platform", args.platform))
      .unique();

    const attrs = {
      userId: identity.subject,
      platform: args.platform,
      accountName: args.accountName,
      accountHandle: args.accountHandle,
      avatarUrl: args.avatarUrl ?? null,
      accessToken: args.accessToken ?? null,
      refreshToken: args.refreshToken ?? null,
      expiresAt: args.expiresAt ?? null,
      status: "connected",
      scopes: args.scopes ?? null,
    } as any;

    if (existing === null) {
      await ctx.db.insert("socialAccounts", attrs);
    } else {
      await ctx.db.patch(existing._id, attrs);
    }
  },
});

export const remove = mutation({
  args: { id: v.string() },
  handler: async (ctx, { id }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const acc = await ctx.db.get(id);
    if (!acc) return;
    if (acc.userId !== identity.subject) throw new Error("Forbidden");
    await ctx.db.delete(id);
  },
});

export const updateStatus = internalMutation({
  args: { id: v.string(), status: v.string(), expiresAt: v.optional(v.number()) },
  async handler(ctx, { id, status, expiresAt }) {
    const acc = await ctx.db.get(id);
    if (!acc) return;
    await ctx.db.patch(id, { status, expiresAt: expiresAt ?? acc.expiresAt });
  },
});
