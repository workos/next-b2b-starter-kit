'use client';

import { Avatar, Box, IconButton, DropdownMenu, Flex, Text } from '@radix-ui/themes';
import Link from 'next/link';
import { PersonIcon } from '@radix-ui/react-icons';
import { usePathname } from 'next/navigation';
import { User } from '@workos-inc/node';
import authkitSignOut from '@/actions/signOut';
import { useState } from 'react';

export function UserNav({ user, role }: { user: User; role: string | undefined }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isAdmin = role === 'admin';
  const isDashboard = pathname.startsWith('/dashboard');

  const handleSignOutClick = async () => {
    await authkitSignOut();
  };

  return (
    <DropdownMenu.Root open={open} onOpenChange={setOpen}>
      <DropdownMenu.Trigger>
        <IconButton variant="ghost" style={{ position: 'relative', cursor: 'pointer' }}>
          <Avatar
            size="2"
            radius="medium"
            src={user.profilePictureUrl as string}
            fallback={user.firstName?.[0] || <PersonIcon />}
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
        {!isDashboard && isAdmin && (
          <>
            <DropdownMenu.Separator />
            <DropdownMenu.Group>
              <Link href="/dashboard">
                <DropdownMenu.Item onClick={() => setOpen(false)}>Dashboard</DropdownMenu.Item>
              </Link>
            </DropdownMenu.Group>
          </>
        )}
        {isDashboard && (
          <>
            <DropdownMenu.Separator />
            <DropdownMenu.Group>
              <Link href="/product">
                <DropdownMenu.Item onClick={() => setOpen(false)}>Product</DropdownMenu.Item>
              </Link>
            </DropdownMenu.Group>
          </>
        )}
        <DropdownMenu.Separator />
        <DropdownMenu.Item color="blue" onClick={() => setOpen(false)}>
          <Box onClick={handleSignOutClick}>Log out</Box>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
