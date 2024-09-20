import styles from './page.module.css';
import { Flex, Text, Heading, Button, Code, Section } from '@radix-ui/themes';
import { getUser } from '@workos-inc/authkit-nextjs';
import { Header } from './components/layout/header';
import { Footer } from './components/layout/footer';
import Link from 'next/link';

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
          <Button>
            <Link href="/pricing">Pricing</Link>
          </Button>
        </Flex>
      </main>
      <Footer />
    </div>
  );
}
