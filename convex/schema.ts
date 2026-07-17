import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  users: defineTable({
    email: v.string(),
    workos_id: v.string(),
  }),
  organizations: defineTable({
    workos_id: v.string(),
    name: v.string(),
  }),
});
