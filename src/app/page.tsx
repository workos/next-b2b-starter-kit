import styles from './page.module.css';
import { Flex, Text, Heading, Code, DataList } from '@radix-ui/themes';
import { Header } from './components/layout/header';
import { Footer } from './components/layout/footer';

export default async function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Header />
        <Flex direction="column" gap="5" justify="center" align="center">
          <Heading size="9">B2B Starter Kit</Heading>
          <Text>An enterprise-ready starter kit for B2B SaaS applications.</Text>
          <Text>Features include:</Text>
          <DataList.Root>
            <DataList.Item align="center">
              <DataList.Label minWidth="88px">Authentication</DataList.Label>
              <DataList.Value>AuthKit</DataList.Value>
            </DataList.Item>
            <DataList.Item align="center">
              <DataList.Label minWidth="88px">Authorization</DataList.Label>
              <DataList.Value>WorkOS</DataList.Value>
            </DataList.Item>
            <DataList.Item align="center">
              <DataList.Label minWidth="88px">Billing</DataList.Label>
              <DataList.Value>Stripe</DataList.Value>
            </DataList.Item>
            <DataList.Item align="center">
              <DataList.Label minWidth="88px">Backend platform</DataList.Label>
              <DataList.Value>Convex</DataList.Value>
            </DataList.Item>
            <DataList.Item align="center">
              <DataList.Label minWidth="88px">Framework</DataList.Label>
              <DataList.Value>Next.js</DataList.Value>
            </DataList.Item>
            <DataList.Item align="center">
              <DataList.Label minWidth="88px">Design system</DataList.Label>
              <DataList.Value>Radix Themes</DataList.Value>
            </DataList.Item>
          </DataList.Root>
          <Text>
            To get started, run: <Code>npx b2b-starter-kit@latest --template</Code>
          </Text>
        </Flex>
      </main>
      <Footer />
    </div>
  );
}
