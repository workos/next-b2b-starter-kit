import {
  Avatar,
  Box,
  IconButton,
  DropdownMenu,
  Flex,
  Text,
} from '@radix-ui/themes';
import { getUser } from '@workos-inc/authkit-nextjs';
import Link from 'next/link';
import signOut from '@/actions/signOut';

export async function UserNav() {
  const { user } = await getUser({ ensureSignedIn: true });

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <IconButton
          variant="ghost"
          radius="full"
          style={{ position: 'relative', cursor: 'pointer' }}
        >
          <Avatar
            size="2"
            radius="full"
            src={user.profilePictureUrl as string}
            fallback={user.firstName?.[0] || ''}
          />
        </IconButton>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content size="2">
        <DropdownMenu.Label>
          <Flex direction="column">
            <Text as="p" size="3" weight="medium">
              {user.firstName}
            </Text>
            <Text as="p" size="1">
              {user.email}
            </Text>
          </Flex>
        </DropdownMenu.Label>
        <DropdownMenu.Separator />
        <DropdownMenu.Group>
          <DropdownMenu.Item>
            <Link href="/dashboard/settings">Settings</Link>
          </DropdownMenu.Item>
        </DropdownMenu.Group>
        <DropdownMenu.Separator />
        <DropdownMenu.Item color="blue">
          <Box onClick={signOut}>Log out</Box>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
