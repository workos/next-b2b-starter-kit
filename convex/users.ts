import { mutation, internalMutation, internalQuery } from "./_generated/server";
import { v } from "convex/values";
import schema from "./schema";

const userFields = schema.tables.users.validator.fields;

export const create = mutation({
  args: v.object(userFields),
  handler: async (ctx, args) => {
    return await ctx.db.insert("users", {
      email: args.email,
      workos_id: args.workos_id,
    });
  },
});

export const getByWorkOSId = internalQuery({
  args: { workos_id: userFields.workos_id },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("workos_id"), args.workos_id))
      .first();
    return user;
  },
});

export const deleteUser = internalMutation({
  args: { id: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db.delete(args.id);
  },
});
