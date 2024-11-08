import { Box, Flex, Card, Text, Strong } from '@radix-ui/themes';
import { withAuth } from '@workos-inc/authkit-nextjs';
import { ModalDialog } from './modal-dialog';
import { CheckIcon } from '@radix-ui/react-icons';

// Ideally this data would come from a database or API
const plans = [
  {
    name: 'Basic',
    teamMembers: 3,
    price: 5,
    currency: '$',
    cadence: 'monthly',
    features: ['Lorem ipsum', 'Lorem ipsum', 'Lorem ipsum', 'Lorem ipsum'],
    highlight: false,
  },
  {
    name: 'Standard',
    teamMembers: 10,
    price: 10,
    currency: '$',
    cadence: 'monthly',
    features: ['Lorem ipsum', 'Lorem ipsum', 'Lorem ipsum', 'Lorem ipsum'],
    highlight: false,
  },
  {
    name: 'Enterprise',
    teamMembers: 'Unlimited',
    price: 100,
    currency: '$',
    cadence: 'yearly',
    features: ['Audit logs', 'Lorem ipsum', 'Lorem ipsum', 'Lorem ipsum'],
    highlight: true,
  },
];

export async function Pricing() {
  const { user } = await withAuth();

  return (
    <Flex gap="5" minWidth="50vw">
      {plans.map((plan) => (
        <Box key={plan.name} flexGrow="1">
          <Card size="3" style={plan.highlight ? { border: '1px solid blue' } : undefined}>
            <Flex direction="column" gap="4">
              <Flex direction="column" gap="0">
                <Text as="p" size="5" color={plan.highlight ? 'blue' : undefined}>
                  {plan.name}
                </Text>
                <Text size="1" color="gray">
                  {plan.teamMembers} team members
                </Text>
              </Flex>
              <Flex align="center" gap="2">
                <Text size="8">
                  <Strong>
                    {plan.currency}
                    {plan.price}
                  </Strong>
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
              <Flex direction="column" gap="2">
                {plan.features.map((feature, index) => (
                  <Flex key={index} align="center" gap="2">
                    <CheckIcon />
                    <Text size="1">{feature}</Text>
                  </Flex>
                ))}
              </Flex>
              {user && <ModalDialog subscriptionLevel={plan.name} userId={user.id} />}
            </Flex>
          </Card>
        </Box>
      ))}
    </Flex>
  );
}
