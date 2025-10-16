import type { Config } from '@react-router/dev/config';

export default {
  appDirectory: './src/app',
  ssr: false,          // ⬅ turn off server-side rendering
  prerender: ['/*?'],
} satisfies Config;
