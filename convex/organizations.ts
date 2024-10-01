import { internalQuery } from './_generated/server';
import schema from './schema';
import { crud } from 'convex-helpers/server/crud';

const organizationFields = schema.tables.organizations.validator.fields;

export const { create, destroy, update } = crud(schema, 'organizations');

export const getByWorkOSId = internalQuery({
  args: { workos_id: organizationFields.workos_id },
  handler: async (ctx, args) => {
    const organization = await ctx.db
      .query('organizations')
      .filter((q) => q.eq(q.field('workos_id'), args.workos_id))
      .first();
    return organization;
  },
});
