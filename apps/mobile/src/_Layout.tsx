import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn: 'https://d6b4f2e300c2e08c54adc97098e90286@o4509797592530944.ingest.de.sentry.io/4509797600526416',

  // Sends personally identifiable info (IP, cookies, user, etc)
  sendDefaultPii: true,

  // Session Replay options
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1,

  integrations: [Sentry.mobileReplayIntegration()],

  // Enable debug logging if needed (remove or set to false for production)
  debug: true,
});
