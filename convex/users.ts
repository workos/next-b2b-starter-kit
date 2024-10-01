import { internalQuery } from './_generated/server';
import schema from './schema';
import { crud } from 'convex-helpers/server/crud';

const userFields = schema.tables.users.validator.fields;

export const { create, destroy, update } = crud(schema, 'users');

export const getByWorkOSId = internalQuery({
  args: { workos_id: userFields.workos_id },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query('users')
      .filter((q) => q.eq(q.field('workos_id'), args.workos_id))
      .first();
    return user;
  },
});
