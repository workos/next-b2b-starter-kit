import { Flex, Heading, Text } from '@radix-ui/themes';
import { Header } from '../components/layout/header';
import { withAuth } from '@workos-inc/authkit-nextjs';

export default async function ProductPage() {
  // Ensure the user is signed in
  const { user } = await withAuth({ ensureSignedIn: true });

  return (
    <Flex align="center" justify="center" direction="column" gap="5" height="100vh">
      <Header signedIn={true} />
      <Heading size="9">{user.firstName && `${user.firstName}'s `}Product page</Heading>

      <Text>This is the page your non-admin user will see after they log in.</Text>
      <Text>
        While admins are redirected to the dashboard where they can configure users and SSO settings, regular users are
        redirected here where they can start using your product.
      </Text>
    </Flex>
  );
}
