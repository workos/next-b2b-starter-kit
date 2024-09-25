import { mutation } from "./_generated/server";
import { v } from "convex/values";
import schema from "./schema";

const userFields = schema.tables.organizations.validator.fields;

export const create = mutation({
  args: v.object(userFields),
  handler: async (ctx, args) => {
    return await ctx.db.insert("organizations", {
      workos_id: args.workos_id,
      name: args.name,
    });
  },
});
