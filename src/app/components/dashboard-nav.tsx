'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { NavItem } from '../../../types';
import { Dispatch, SetStateAction } from 'react';
import { useSidebar } from '@/hooks/useSidebar';
import { Box, Flex, Button, Badge } from '@radix-ui/themes';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@radix-ui/react-tooltip';
import { ArrowRightIcon } from '@radix-ui/react-icons';

interface DashboardNavProps {
  items: NavItem[];
  setOpen?: Dispatch<SetStateAction<boolean>>;
}

export function DashboardNav({ items, setOpen }: DashboardNavProps) {
  const path = usePathname();
  const { isMinimized } = useSidebar();

  if (!items?.length) {
    return null;
  }

  return (
    <Flex
      direction="column"
      align="stretch"
      gap="3"
      overflow="hidden"
      flexGrow="1"
    >
      <TooltipProvider>
        {items.map((item, index) => {
          const Icon = item.icon ?? ArrowRightIcon;
          return (
            item.href && (
              <Tooltip key={index}>
                <TooltipTrigger asChild>
                  <Button
                    size="3"
                    variant={path === item.href ? 'solid' : 'soft'}
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      if (setOpen) setOpen(false);
                    }}
                  >
                    <Link
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                        overflow: 'hidden',
                      }}
                      href={item.href}
                    >
                      <Icon width="20px" height="20px" />
                      {!isMinimized && item.title}
                    </Link>
                  </Button>
                </TooltipTrigger>
                {isMinimized && (
                  <TooltipContent
                    side="right"
                    align="center"
                    sideOffset={8}
                    style={{ zIndex: 10 }}
                  >
                    <Box p="2">
                      <Badge color="blue" variant="solid" radius="large">
                        {item.title}
                      </Badge>
                    </Box>
                  </TooltipContent>
                )}
              </Tooltip>
            )
          );
        })}
      </TooltipProvider>
    </Flex>
  );
}
