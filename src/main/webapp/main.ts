import { initFaro } from './app/core/faro/faro';

// Initialize Grafana Faro RUM as early as possible so it captures the initial
// page load / Web Vitals. Kept non-fatal so a misconfigured/unreachable
// collector never blocks the app from bootstrapping.
try {
  initFaro();
} catch (err: unknown) {
  console.error('Faro init failed', err); // NOSONAR
}

import('./bootstrap').catch((err: unknown) => console.error(err)); // NOSONAR
