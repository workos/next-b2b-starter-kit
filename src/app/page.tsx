import styles from './page.module.css';
import { Card, Code, Flex, Text, Heading, Grid } from '@radix-ui/themes';
import { Header } from './components/layout/header';
import { Footer } from './components/layout/footer';
import CopyButton from './components/copy-button';
import Image from 'next/image';

const features = [
  {
    title: 'Authentication',
    description:
      'Effortlessly manage authentication and user management with AuthKit, enabling secure sign-up and streamlining user access.',
    logo: {
      path: '/authkit_logo.svg',
      width: 90,
    },
  },
  {
    title: 'Authorization',
    description:
      'Robust access control and role-based access with WorkOS, designed to scale with your app with everything you need to get enterprise ready.',
    logo: {
      path: '/workos_logo.svg',
      width: 106,
    },
  },
  {
    title: 'Billing',
    description:
      'Streamline your payment processes with Stripe, facilitating easy invoicing and transaction management to keep your finances organized.',
    logo: {
      path: '/stripe_logo.svg',
      width: 105,
    },
  },
  {
    title: 'Backend platform',
    description:
      'Build a powerful and efficient application foundation with Convex, ensuring reliable data handling and seamless performance.',
    logo: {
      path: '/convex_logo.svg',
      width: 117,
    },
  },
  {
    title: 'Framework',
    description:
      'Accelerate your development with Next.js, enabling you to create high-quality web applications with the power of React.',
    logo: {
      path: '/next_logo.svg',
      width: 100,
    },
  },
  {
    title: 'Design system',
    description:
      'Built with Radix, an open-source UI component library for creating high-quality, accessible design systems and web apps.',
    logo: {
      path: '/radix_logo.svg',
      width: 67,
    },
  },
];

export default async function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Header />
        <Flex direction="column" gap="5" justify="center" align="center" maxWidth="75vw">
          <Flex direction="column" justify="center" align="center" maxWidth="50vw">
            <Heading size="9">B2B Starter Kit</Heading>
            <Text mt="6" size="7" align="center">
              Quickly build and deploy your B2B SaaS application using modern frameworks designed for seamless scaling
              for enterprise customers.
            </Text>
          </Flex>

          <CopyButton copyValue="npx b2b-starter-kit@latest --template">
            <Code size="4">npx b2b-starter-kit@latest --template</Code>
          </CopyButton>
          <Grid columns="3" gap="6" mt="3">
            {features.map((feature) => (
              <Card size="2" key={feature.title}>
                <Flex direction="column" gap="4" m="3" p="2">
                  <Text size="6">{feature.title}</Text>
                  <Text color="gray">{feature.description}</Text>
                  <Image src={feature.logo.path} alt={feature.title} width={feature.logo.width} height={21} />
                </Flex>
              </Card>
            ))}
          </Grid>
        </Flex>
      </main>
      <Footer />
    </div>
  );
}
