import styles from './page.module.css';
import { Flex, Text, Heading, Button, Code, Link, Box } from '@radix-ui/themes';
import { getUser } from '@workos-inc/authkit-nextjs';
import { Header } from './components/header';

export default async function Home() {
  const { user } = await getUser();

  if (user) {
    console.log(user);
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Header />
        <Flex direction="column" gap="5">
          <Heading size="9">B2B Starter Kit</Heading>
          <Text>
            An enterprise-ready starter kit for B2B SaaS applications.
          </Text>
          <Text>
            Features include:
            <ul>
              <li>Authentication</li>
              <li>Authorization</li>
              <li>Webhooks</li>
              <li>Stripe integration</li>
            </ul>
          </Text>
          <Text>
            To get started, run: <Code>npx b2b-starter-kit</Code>
          </Text>
          <Button>Pricing</Button>
        </Flex>
      </main>
      <footer className={styles.footer}>
        <Box>
          <Text size="2">
            Made with ❤️ by<Link href="https://workos.com"> WorkOS</Link>
          </Text>
        </Box>
      </footer>
    </div>
  );
}
