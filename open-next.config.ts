import { defineCloudflareConfig } from '@opennextjs/cloudflare';

// Pages read the AuthKit session per request. No shared ISR cache is needed.
export default defineCloudflareConfig();
