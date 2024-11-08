'use client';

import Link from 'next/link';
import { Box, Flex } from '@radix-ui/themes';
import { ArrowRightIcon, PersonIcon, GearIcon, DashboardIcon, ArchiveIcon } from '@radix-ui/react-icons';
import { usePathname } from 'next/navigation';
import styles from './page.module.css';

const navItems = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: DashboardIcon,
    label: 'Dashboard',
  },
  {
    title: 'Users',
    href: '/dashboard/users',
    icon: PersonIcon,
    label: 'Users',
  },
  {
    title: 'Audit Logs',
    href: '/dashboard/audit-logs',
    icon: ArchiveIcon,
    label: 'Audit Logs',
  },
  {
    title: 'Settings',
    href: '/dashboard/settings',
    icon: GearIcon,
    label: 'Settings',
  },
];

export function DashboardNav() {
  const pathname = usePathname();

  return (
    <Box width="300px">
      <Flex direction="column" align="stretch" gap="1" overflow="hidden" flexGrow="1">
        {navItems.map((item, index) => {
          const Icon = item.icon ?? ArrowRightIcon;
          const selected = pathname === item.href ? styles['selected'] : null;
          return (
            item.href && (
              <Flex p="1" direction="column" key={index} gap="1">
                <Link href={item.href}>
                  <Flex align="center" gap="2" className={[styles['dashboard-nav-button'], selected].join(' ')} p="2">
                    <Icon width="20px" height="20px" />
                    {item.title}
                  </Flex>
                </Link>
              </Flex>
            )
          );
        })}
      </Flex>
    </Box>
  );
}
