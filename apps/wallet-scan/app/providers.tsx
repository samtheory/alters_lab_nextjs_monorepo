"use client";

import type { ThemeProviderProps } from "next-themes";

import * as React from "react";
import { HeroUIProvider, type HeroUIProviderProps } from "@heroui/system";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

declare module "@react-types/shared" {
  interface RouterConfig {
    routerOptions: NonNullable<
      Parameters<ReturnType<typeof useRouter>["push"]>[1]
    >;
  }
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();

  const providerProps: HeroUIProviderProps = {
    navigate: router.push,
    children: (
      <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
    ),
  };

  // Call the provider directly and assert the return type to satisfy the compiler.
  return HeroUIProvider(providerProps) as React.ReactElement;
}
