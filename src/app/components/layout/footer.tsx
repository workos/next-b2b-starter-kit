import { Box, Text, Link } from '@radix-ui/themes';
import Image from 'next/image';

export function Footer() {
  return (
    <Box>
      <Box as="div" position="absolute" left="9" bottom="5">
        <Text>
          Made with 💙 by <Link href="https://www.workos.com">WorkOS</Link>
        </Text>
      </Box>
      <Box as="div" position="absolute" right="9" bottom="5">
        <Link href="https://github.com/workos/b2b-starter-kit">
          <Image src="/logos/github_logo.svg" alt="Find on GitHub" width={24} height={24} />
        </Link>
      </Box>
    </Box>
  );
}
