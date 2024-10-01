import { Box, Text, Link } from '@radix-ui/themes';

export function Footer() {
  return (
    <Box as="div" position="absolute" bottom="5">
      <Text>
        Made with 💙 by <Link href="https://www.workos.com">WorkOS</Link>
      </Text>
    </Box>
  );
}
