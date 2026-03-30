import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    externalId: v.string(),
    name: v.string(),
    email: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    plan: v.optional(v.union(v.literal("free"), v.literal("premium"))),
    timezone: v.optional(v.string()),
    createdAt: v.optional(v.number()),
  }).index("byExternalId", ["externalId"]),

  socialAccounts: defineTable({
    userId: v.string(),
    platform: v.string(),
    accountName: v.string(),
    accountHandle: v.string(),
    avatarUrl: v.optional(v.string()),
    accessToken: v.optional(v.string()),
    refreshToken: v.optional(v.string()),
    expiresAt: v.optional(v.number()),
    status: v.union(v.literal("connected"), v.literal("disconnected"), v.literal("expired")),
    scopes: v.optional(v.array(v.string())),
  }).index("by_userId", ["userId"]).index("by_userId_and_platform", ["userId", "platform"]),

  posts: defineTable({
    userId: v.string(),
    content: v.string(),
    mediaUrls: v.optional(v.array(v.string())),
    platforms: v.optional(v.array(v.string())),
    status: v.optional(v.union(v.literal("scheduled"), v.literal("published"), v.literal("failed"), v.literal("draft"))),
    scheduledAt: v.optional(v.number()),
    publishedAt: v.optional(v.number()),
    isDraft: v.optional(v.boolean()),
  }).index("by_userId", ["userId"]).index("by_userId_and_status", ["userId", "status"]).index("by_userId_and_scheduledAt", ["userId", "scheduledAt"]),

  postPlatformResults: defineTable({
    postId: v.string(),
    platform: v.string(),
    externalPostId: v.optional(v.string()),
    status: v.union(v.literal("pending"), v.literal("success"), v.literal("failed")),
    errorMessage: v.optional(v.string()),
    publishedAt: v.optional(v.number()),
  }),

  autoReplyRules: defineTable({
    userId: v.string(),
    platform: v.string(),
    triggerType: v.string(),
    keywords: v.optional(v.array(v.string())),
    responseTemplate: v.string(),
    isActive: v.boolean(),
    priority: v.number(),
  }).index("by_userId", ["userId"]).index("by_userId_and_platform", ["userId", "platform"]),

  autoReplyLogs: defineTable({
    ruleId: v.string(),
    postId: v.optional(v.string()),
    commentId: v.string(),
    commentText: v.string(),
    replySent: v.boolean(),
    sentAt: v.number(),
  }),

  subscriptions: defineTable({
    userId: v.string(),
    lemonSqueezyCustomerId: v.optional(v.string()),
    lemonSqueezySubscriptionId: v.optional(v.string()),
    planId: v.optional(v.string()),
    status: v.optional(v.string()),
    currentPeriodEnd: v.optional(v.number()),
  }).index("by_userId", ["userId"]).index("by_lemonSqueezyCustomerId", ["lemonSqueezyCustomerId"]),
});
