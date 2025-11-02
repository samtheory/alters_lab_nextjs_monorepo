export const packageMetadata = {
  "api-client": {
    title: "API Client",
    description:
      "Utilities for interacting with the Alters API, complete with auth helpers and typed request wrappers.",
  },
  config: {
    title: "Shared Config",
    description:
      "Reusable Tailwind, ESLint, and TypeScript settings shared across applications in the monorepo.",
  },
  types: {
    title: "Shared Types",
    description:
      "Common TypeScript interfaces for users, marketplace results, and pricing history.",
  },
  ui: {
    title: "UI Kit",
    description:
      "Reusable design system components such as buttons and cards built on top of Tailwind.",
  },
  utils: {
    title: "Utility Helpers",
    description:
      "Time, math, and crypto helpers that power formatting and calculations throughout the apps.",
  },
} as const;

export type PackageKey = keyof typeof packageMetadata;

export const packageKeys = Object.keys(packageMetadata) as PackageKey[];
