'use client';

import React, { useState } from 'react';
import { Button, Callout, Dialog, Flex, Text, TextField } from '@radix-ui/themes';
import { InfoCircledIcon } from '@radix-ui/react-icons';
import { useRouter } from 'next/navigation';

export function ModalDialog({ subscriptionLevel, userId }: { subscriptionLevel: string; userId: string }) {
  const router = useRouter();

  const [orgName, setOrgName] = useState('');
  const [domain, setDomain] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleSubscribe = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setLoading(true);

    if (orgName === '' || domain === '') {
      setError('Please fill out both Organization name and Domain.');
      setLoading(false);
      return;
    }

    // Call API to create a new organization and subscribe to plan
    // The user will be redirected to Stripe Checkout
    const res = await fetch('/api/subscribe', {
      method: 'POST',
      body: JSON.stringify({ userId, orgName, domain, subscriptionLevel }),
    });

    const { error, url } = await res.json();

    if (!error) {
      return router.push(url);
    }

    setLoading(false);
    setError(`Error subscribing to plan: ${error}`);
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>
        <Button onClick={() => setError('')}>Subscribe to {subscriptionLevel} plan</Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Title>Subscribe to {subscriptionLevel} plan</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Enter details about your business
        </Dialog.Description>

        <Flex direction="column" gap="3">
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Organization name
            </Text>
            <TextField.Root placeholder="Enter your orgnization name" onBlur={(e) => setOrgName(e.target.value)} />
          </label>
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Domain
            </Text>
            <TextField.Root placeholder="Enter your full domain" onBlur={(e) => setDomain(e.target.value)} />
          </label>
          {error && (
            <Callout.Root color="red">
              <Callout.Icon>
                <InfoCircledIcon />
              </Callout.Icon>
              <Callout.Text>{error}</Callout.Text>
            </Callout.Root>
          )}
        </Flex>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button loading={loading} onClick={handleSubscribe}>
              Subscribe
            </Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}
