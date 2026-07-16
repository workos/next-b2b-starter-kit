'use client';

import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { useTheme } from '@/lib/next-themes';
import { IconButton, DropdownMenu } from '@radix-ui/themes';
import { useIsHydrated } from '@/lib/use-is-hydrated';

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const isHydrated = useIsHydrated();

  const Icon = isHydrated ? (resolvedTheme === 'light' ? SunIcon : MoonIcon) : SunIcon;

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
