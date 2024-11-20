import styles from './page.module.css';
import { Card, Code, Flex, Text, Heading, Grid } from '@radix-ui/themes';
import CopyButton from './components/copy-button';
import Image from 'next/image';

const features = [
  {
    title: 'Authentication',
    description:
      'Effortlessly manage authentication and user management with AuthKit, enabling secure sign-up and streamlining user access.',
    logo: {
      path: '/logos/authkit_logo.svg',
      width: 90,
    },
  },
  {
    title: 'Authorization',
    description:
      'Robust access control and role-based access with WorkOS, designed to scale with your app with everything you need to get enterprise ready.',
    logo: {
      path: '/logos/workos_logo.svg',
      width: 106,
    },
  },
  {
    title: 'Billing',
    description:
      'Streamline your payment processes with Stripe, facilitating easy invoicing and transaction management to keep your finances organized.',
    logo: {
      path: '/logos/stripe_logo.svg',
      width: 105,
    },
  },
  {
    title: 'Backend platform',
    description:
      'Build a powerful and efficient application foundation with Convex, ensuring reliable data handling and seamless performance.',
    logo: {
      path: '/logos/convex_logo.svg',
      width: 117,
    },
  },
  {
    title: 'Framework',
    description:
      'Accelerate your development with Next.js, enabling you to create high-quality web applications with the power of React.',
    logo: {
      path: '/logos/next_logo.svg',
      width: 100,
    },
  },
  {
    title: 'Design system',
    description:
      'Built with Radix, an open-source UI component library for creating high-quality, accessible design systems and web apps.',
    logo: {
      path: '/logos/radix_logo.svg',
      width: 67,
    },
  },
];

export default async function Home() {
  return (
    <Flex justify="center" align="center" flexGrow="1">
      <Flex direction="column" gap="9" justify="center" align="center" maxWidth="75vw">
        <Flex direction="column" justify="center" align="center" maxWidth="50vw" gap="5">
          <Heading size="9" align="center">
            Next.js B2B Starter Kit
          </Heading>
          <Text size="7" align="center">
            Quickly build and deploy your B2B SaaS application using modern frameworks designed for seamless scaling for
            enterprise customers.
          </Text>
          <CopyButton copyValue="git clone https://github.com/workos/b2b-starter-kit.git">
            <Code variant="ghost" size="4">
              git clone https://github.com/workos/b2b-starter-kit.git
            </Code>
          </CopyButton>
        </Flex>
        <Grid columns="3" gap="6" mt="3" mb="9" maxWidth="70vw">
          {features.map((feature) => (
            <Card className={styles.productFeature} size="2" key={feature.title}>
              <Flex direction="column" gap="4" m="3" p="2">
                <Text size="6">{feature.title}</Text>
                <Text color="gray">{feature.description}</Text>
                <Image src={feature.logo.path} alt={feature.title} width={feature.logo.width} height={21} />
              </Flex>
            </Card>
          ))}
        </Grid>
      </Flex>
    </Flex>
  );
}
