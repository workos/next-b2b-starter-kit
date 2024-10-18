'use client';

import React from 'react';
import { DashboardNav } from '../dashboard-nav';
import { ChevronLeftIcon, PersonIcon, GlobeIcon, GearIcon, DashboardIcon, ArchiveIcon } from '@radix-ui/react-icons';
import { useSidebar } from '@/hooks/useSidebar';
import Link from 'next/link';
import { NavItem } from '../../../../types';
import { Box, Flex } from '@radix-ui/themes';

export default function Sidebar() {
  const { isMinimized, toggle } = useSidebar();

  return (
    <Box
      width={isMinimized ? '72px' : '240px'}
      height="100vh"
      style={{
        transition: 'all',
        transitionProperty: 'width',
        transitionDuration: '500ms',
        borderRight: '1px solid grey',
      }}
      position="relative"
    >
      <Flex
        align="center"
        justify="center"
        position="absolute"
        width="30px"
        height="30px"
        right="-15px"
        top="4"
        p="1"
        style={{
          border: '1px solid grey',
          borderRadius: '50%',
          cursor: 'pointer',
          zIndex: 1,
          background: 'var(--accent-1)',
        }}
        onClick={toggle}
      >
        <ChevronLeftIcon
          style={{
            rotate: isMinimized ? '180deg' : '0deg',
          }}
        />
      </Flex>
      <Box p="2" style={{ marginTop: '1rem', paddingTop: '10px' }}>
        <DashboardNav items={navItems} />
      </Box>
    </Box>
  );
}
