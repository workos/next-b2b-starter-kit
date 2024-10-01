import { Box, Flex, Card, Inset, Text, Strong, Table, IconButton } from '@radix-ui/themes';
import { withAuth } from '@workos-inc/authkit-nextjs';
import { ModalDialog } from './modal-dialog';
import Image from 'next/image';
import { CheckCircledIcon } from '@radix-ui/react-icons';

export async function Pricing() {
  const { user } = await withAuth();

  return (
    <Flex gap="5">
      <Box maxWidth="400px">
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
          <Flex gap="3" direction="column">
            <Text as="p" size="5">
              <Strong>Basic</Strong>
            </Text>
            <Table.Root variant="surface">
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeaderCell justify="center">Feature</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell justify="center">Included</Table.ColumnHeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                <Table.Row>
                  <Table.RowHeaderCell justify="center">Feature A</Table.RowHeaderCell>
                  <Table.Cell justify="center">✅</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.RowHeaderCell justify="center">Feature B</Table.RowHeaderCell>
                  <Table.Cell justify="center">❌</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.RowHeaderCell justify="center">Feature C</Table.RowHeaderCell>
                  <Table.Cell justify="center">❌</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table.Root>
            {user && <ModalDialog subscriptionLevel="basic" userId={user.id} />}
          </Flex>
        </Card>
      </Box>
      <Box maxWidth="400px">
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
          <Flex gap="3" direction="column">
            <Text as="p" size="5">
              <Strong>Economic</Strong>
            </Text>
            <Table.Root variant="surface">
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeaderCell justify="center">Feature</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell justify="center">Included</Table.ColumnHeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                <Table.Row>
                  <Table.RowHeaderCell justify="center">Feature A</Table.RowHeaderCell>
                  <Table.Cell justify="center">✅</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.RowHeaderCell justify="center">Feature B</Table.RowHeaderCell>
                  <Table.Cell justify="center">✅</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.RowHeaderCell justify="center">Feature C</Table.RowHeaderCell>
                  <Table.Cell justify="center">❌</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table.Root>
            {user && <ModalDialog subscriptionLevel="economic" userId={user.id} />}
          </Flex>
        </Card>
      </Box>
      <Box maxWidth="400px">
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
          <Flex gap="3" direction="column">
            <Text as="p" size="5">
              <Strong>Enterprise</Strong>
            </Text>
            <Table.Root variant="surface">
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeaderCell justify="center">Feature</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell justify="center">Included</Table.ColumnHeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                <Table.Row>
                  <Table.RowHeaderCell justify="center">Feature A</Table.RowHeaderCell>
                  <Table.Cell justify="center">✅</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.RowHeaderCell justify="center">Feature B</Table.RowHeaderCell>
                  <Table.Cell justify="center">✅</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.RowHeaderCell justify="center">Feature C</Table.RowHeaderCell>
                  <Table.Cell justify="center">✅</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table.Root>
            {user && <ModalDialog subscriptionLevel="enterprise" userId={user.id} />}
          </Flex>
        </Card>
      </Box>
    </Flex>
  );
}
