import { Box, Flex, Card, Text, Strong } from '@radix-ui/themes';
import { withAuth } from '@workos-inc/authkit-nextjs';
import { ModalDialog } from './modal-dialog';
import { CheckIcon } from '@radix-ui/react-icons';

const plans = [
  {
    name: 'Basic',
    teamMembers: 3,
    price: 5,
    cadence: 'monthly',
    features: ['Lorem ipsum', 'Lorem ipsum', 'Lorem ipsum', 'Lorem ipsum'],
  },
  {
    name: 'Standard',
    teamMembers: 10,
    price: 10,
    cadence: 'monthly',
    features: ['Lorem ipsum', 'Lorem ipsum', 'Lorem ipsum', 'Lorem ipsum'],
  },
  {
    name: 'Enterprise',
    teamMembers: 'Unlimited',
    price: 100,
    cadence: 'yearly',
    features: ['Lorem ipsum', 'Lorem ipsum', 'Lorem ipsum', 'Lorem ipsum'],
  },
];

export async function Pricing() {
  const { user } = await withAuth();

  return (
    <Flex gap="5" minWidth="50vw">
      {plans.map((plan) => (
        <Box key={plan.name} style={{ flexGrow: 1 }}>
          <Card size="3">
            <Flex direction="column" gap="3">
              <Flex direction="column" gap="0">
                <Text as="p" size="5">
                  {plan.name}
                </Text>
                <Text size="1" color="gray">
                  {plan.teamMembers} team members
                </Text>
              </Flex>
              <Flex align="center" gap="2">
                <Text size="8">
                  <Strong>${plan.price}</Strong>
                </Text>
                <Flex direction="column">
                  <Text size="1" color="gray">
                    per month,
                  </Text>
                  <Text size="1" color="gray">
                    billed {plan.cadence}
                  </Text>
                </Flex>
              </Flex>
              {plan.features.map((feature) => (
                <Flex key={feature} align="center" gap="2">
                  <CheckIcon />
                  <Text size="1">{feature}</Text>
                </Flex>
              ))}
              {user && <ModalDialog subscriptionLevel={plan.name.toLowerCase()} userId={user.id} />}
            </Flex>
          </Card>
        </Box>
      ))}
    </Flex>
  );
}
