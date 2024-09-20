import type { NextApiRequest, NextApiResponse } from 'next';
import { workos } from '../../api/workos';
import { getUser } from '@workos-inc/authkit-nextjs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { user } = await getUser({ ensureSignedIn: true });
    const { id: userId } = user;

    const orgMemberships = await workos.userManagement.listOrganizationMemberships({
      userId,
    })

    try {

    }
  }
}