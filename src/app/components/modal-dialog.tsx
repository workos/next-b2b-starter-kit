'use client';

import React, { useState } from 'react';
import { Button, Callout, Dialog, Flex, Text, TextField } from '@radix-ui/themes';
import { InfoCircledIcon } from '@radix-ui/react-icons';

export function ModalDialog({ subscriptionLevel, userId }: { subscriptionLevel: string; userId: string }) {
  const [orgName, setOrgName] = useState('');
  const [domain, setDomain] = useState('');
  const [showError, setShowError] = useState(false);

  const handleSubscribe = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (orgName === '' || domain === '') {
      e.preventDefault();
      setShowError(true);
      return;
    }

    console.log('Subscribing to plan: ', subscriptionLevel);
    console.log(orgName, domain);

    // Call API to create a new organization and subscribe to plan
    // The user will be redirected to Stripe Checkout
    await fetch('/api/create-checkout-session', {
      method: 'POST',
      body: JSON.stringify({ userId, orgName, domain }),
    });
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button onClick={() => setShowError(false)}>Subscribe to {subscriptionLevel} plan</Button>
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
          {showError && (
            <Callout.Root color="red">
              <Callout.Icon>
                <InfoCircledIcon />
              </Callout.Icon>
              <Callout.Text>Please fill out both Organization name and Domain.</Callout.Text>
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
            <Button onClick={handleSubscribe}>Subscribe</Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}
