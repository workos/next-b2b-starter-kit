'use client';

import React, { useEffect } from 'react';

export default function StripePricingTable() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://js.stripe.com/v3/pricing-table.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return React.createElement('stripe-pricing-table', {
    'pricing-table-id': process.env.NEXT_PUBLIC_STRIPE_PRICING_TABLE_ID,
    'publishable-key': process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    style: { width: '100vw' },
  });
}
