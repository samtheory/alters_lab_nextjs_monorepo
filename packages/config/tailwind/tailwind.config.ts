import type { Config } from 'tailwindcss';
const config: Config = {
  content: ['../../apps/**/app/**/*.{ts,tsx}','../../apps/**/components/**/*.{ts,tsx}','../../packages/ui/src/**/*.{ts,tsx}'],
  theme: { extend: {} },
  plugins: []
}; export default config;