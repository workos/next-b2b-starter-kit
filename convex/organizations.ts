import { mutation, internalQuery, internalMutation } from "./_generated/server";
import { v } from "convex/values";
import schema from "./schema";

const organizationFields = schema.tables.organizations.validator.fields;

export const create = mutation({
  args: v.object(organizationFields),
  handler: async (ctx, args) => {
    return await ctx.db.insert("organizations", {
      workos_id: args.workos_id,
      name: args.name,
    });
  },
});

export const getByWorkOSId = internalQuery({
  args: { workos_id: organizationFields.workos_id },
  handler: async (ctx, args) => {
    const organization = await ctx.db
      .query("organizations")
      .filter((q) => q.eq(q.field("workos_id"), args.workos_id))
      .first();
    return organization;
  },
});

export const deleteOrganization = internalMutation({
  args: { id: v.id("organizations") },
  handler: async (ctx, args) => {
    return await ctx.db.delete(args.id);
  },
});
