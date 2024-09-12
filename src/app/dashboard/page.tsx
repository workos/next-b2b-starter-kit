import { Flex } from '@radix-ui/themes';
import { getUser } from '@workos-inc/authkit-nextjs';

export default async function Dashboard() {
  const { user } = await getUser({ ensureSignedIn: true });

  return (
    <div>
      <Flex>
        <h1>Welcome, {user.firstName}</h1>
      </Flex>
    </div>
  );
}
