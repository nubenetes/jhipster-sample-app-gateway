import { Faro, getWebInstrumentations, initializeFaro } from '@grafana/faro-web-sdk';
import { TracingInstrumentation } from '@grafana/faro-web-tracing';

import { environment } from 'environments/environment';

let faro: Faro | undefined;

/**
 * Initialize the Grafana Faro Web SDK for real browser RUM (Web Vitals, errors,
 * logs) and OpenTelemetry web tracing.
 *
 * The collector endpoint and the deployment environment are read from the
 * Angular environment config (`environment.faro`). Initialization is skipped
 * when no `url` is configured or when Faro has already been initialized, so the
 * call is safe to make eagerly and more than once.
 */
export function initFaro(): Faro | undefined {
  const config = environment.faro;

  // Guard against double-init and against a missing/empty collector URL.
  if (faro || !config?.url) {
    return faro;
  }

  faro = initializeFaro({
    url: config.url,
    app: {
      name: 'angular-gateway',
      version: environment.VERSION || '0.0.1',
      environment: config.environment,
    },
    instrumentations: [...getWebInstrumentations(), new TracingInstrumentation()],
  });

  return faro;
}
