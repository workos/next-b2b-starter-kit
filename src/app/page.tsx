import styles from './page.module.css';
import {
  Flex,
  Box,
  Text,
  Heading,
  Card,
  Inset,
  Code,
  DataList,
  Strong,
} from '@radix-ui/themes';
import { Header } from './components/layout/header';
import { Footer } from './components/layout/footer';
import Image from 'next/image';

export default async function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Header />
        <Flex direction="column" gap="5" justify="center" align="center">
          <Heading size="9">B2B Starter Kit</Heading>
          <Text>
            An enterprise-ready starter kit for B2B SaaS applications.
          </Text>
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
            To get started, run:{' '}
            <Code>npx b2b-starter-kit@latest --template</Code>
          </Text>
          <Flex gap="5">
            <Card size="3">
              <Inset clip="padding-box" side="top" pb="current">
                <Image
                  src="https://images.unsplash.com/photo-1617050318658-a9a3175e34cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
                  alt="Basic"
                  width={400}
                  height={140}
                  style={{
                    display: 'block',
                    objectFit: 'cover',
                    backgroundColor: 'var(--gray-5)',
                  }}
                />
              </Inset>
              <Text as="p" size="3">
                <Strong>Basic - a plan for up to 10 members</Strong>
              </Text>
            </Card>
            <Card size="3">
              <Inset clip="padding-box" side="top" pb="current">
                <Image
                  src="https://images.unsplash.com/photo-1617050318658-a9a3175e34cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
                  alt="Basic"
                  width={400}
                  height={140}
                  style={{
                    display: 'block',
                    objectFit: 'cover',
                    backgroundColor: 'var(--gray-5)',
                  }}
                />
              </Inset>
              <Text as="p" size="3">
                <Strong>Economic - a plan for up to 50 members</Strong>
              </Text>
            </Card>
            <Card size="3">
              <Inset clip="padding-box" side="top" pb="current">
                <Image
                  src="https://images.unsplash.com/photo-1617050318658-a9a3175e34cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
                  alt="Basic"
                  width={400}
                  height={140}
                  style={{
                    display: 'block',
                    objectFit: 'cover',
                    backgroundColor: 'var(--gray-5)',
                  }}
                />
              </Inset>
              <Text as="p" size="3">
                <Strong>Enterprise - a plan for more than 50 members</Strong>
              </Text>
            </Card>
          </Flex>
        </Flex>
      </main>
      <Footer />
    </div>
  );
}
