'use client';

import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { useTheme } from 'next-themes';
import { IconButton, DropdownMenu } from '@radix-ui/themes';
import { useEffect } from 'react';
import { useState } from 'react';

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const Icon = mounted ? (resolvedTheme === 'light' ? SunIcon : MoonIcon) : SunIcon;

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <IconButton variant="ghost" style={{ cursor: 'pointer' }}>
          <Icon style={{ height: '1.2rem', width: '1.2rem', transition: 'all' }} />
        </IconButton>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content align="end">
        <DropdownMenu.Item onClick={() => setTheme('light')}>Light</DropdownMenu.Item>
        <DropdownMenu.Item onClick={() => setTheme('dark')}>Dark</DropdownMenu.Item>
        <DropdownMenu.Item onClick={() => setTheme('system')}>System</DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
