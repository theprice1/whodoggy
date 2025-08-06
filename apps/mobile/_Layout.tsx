// apps/mobile/App.tsx or _layout.tsx
import * as Sentry from 'sentry-expo';

Sentry.init({
  dsn: 'https://YOUR_PUBLIC_DSN_HERE@o123456.ingest.sentry.io/YOUR_PROJECT_ID',
  enableInExpoDevelopment: true,
  debug: true,
});
