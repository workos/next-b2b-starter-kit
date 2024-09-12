import styles from './page.module.css';
import { Flex, Text, Heading, Button } from '@radix-ui/themes';
import { getUser } from '@workos-inc/authkit-nextjs';
import { SignInButton } from './components/sign-in-button';
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
        <Flex direction="column" gap="2">
          <Heading>B2B Starter Kit</Heading>
          <Button>Pricing</Button>
        </Flex>
      </main>
      <footer className={styles.footer}>
        <Flex direction="row">
          <Text size="2">
            Made with ❤️ by<a href="https://workos.com"> WorkOS</a>
          </Text>
        </Flex>
      </footer>
    </div>
  );
}
