'use client';
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { useTheme } from 'next-themes';
import { IconButton, DropdownMenu } from '@radix-ui/themes';

export default function ThemeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <IconButton variant="ghost" style={{ cursor: 'pointer' }}>
          <SunIcon
            style={{ height: '1.2rem', width: '1.2rem', transition: 'all' }}
          />
          <MoonIcon
            style={{
              position: 'absolute',
              height: '1.2rem',
              width: '1.2rem',
              rotate: '90deg',
              scale: 0,
              transition: 'all',
            }}
          />
        </IconButton>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content align="end">
        <DropdownMenu.Item onClick={() => setTheme('light')}>
          Light
        </DropdownMenu.Item>
        <DropdownMenu.Item onClick={() => setTheme('dark')}>
          Dark
        </DropdownMenu.Item>
        <DropdownMenu.Item onClick={() => setTheme('system')}>
          System
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
