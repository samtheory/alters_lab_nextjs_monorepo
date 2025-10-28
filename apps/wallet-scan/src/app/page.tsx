"use client";
import { Button as ShadcnButton } from "@ui/shared";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@ui/shared";
import { Button as HeroButton, Input, Chip } from "@heroui/react";
import { health } from "@api/client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page() {
  const [apiStatus, setApiStatus] = useState("Loading...");

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const healthData = await health();
        setApiStatus(healthData.ok ? "Healthy" : "Unhealthy");
      } catch {
        setApiStatus("Error");
      }
    };

    checkHealth();
  }, []);

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-foreground">
            🔍 Wallet Scanner
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Advanced crypto wallet analytics and portfolio tracking. Scan wallets, analyze transactions,
            and discover high-potential wallets with real-time insights.
          </p>
          <Chip color="success" variant="flat">
            Status: {apiStatus}
          </Chip>
        </div>

        {/* Quick Navigation */}
        <div className="flex justify-center gap-4">
          <Link href="/forms">
            <HeroButton color="primary" variant="flat">
              📝 Forms Demo
            </HeroButton>
          </Link>
          <Link href="/test">
            <HeroButton color="secondary" variant="flat">
              🧪 Hero UI Test
            </HeroButton>
          </Link>
          <HeroButton color="warning" variant="flat">
            ⚙️ Settings
          </HeroButton>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                📊 Portfolio Analytics
              </CardTitle>
              <CardDescription>
                Deep dive into wallet performance with real-time analytics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Track portfolio value, profit/loss calculations, and asset distribution
                across multiple blockchains.
              </p>
            </CardContent>
            <CardFooter>
              <ShadcnButton className="w-full">
                Analyze Wallet
              </ShadcnButton>
            </CardFooter>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                🎯 High-Potential Wallets
              </CardTitle>
              <CardDescription>
                Discover wallets with exceptional performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                AI-powered scanning to identify wallets with consistent profits
                and smart trading patterns.
              </p>
            </CardContent>
            <CardFooter>
              <HeroButton color="primary" className="w-full">
                View Top Performers
              </HeroButton>
            </CardFooter>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                📈 Trading Signals
              </CardTitle>
              <CardDescription>
                Buy/sell signals based on wallet activity
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Get notified when successful traders make moves. Copy strategies
                from proven performers.
              </p>
            </CardContent>
            <CardFooter>
              <ShadcnButton variant="outline" className="w-full">
                Setup Alerts
              </ShadcnButton>
            </CardFooter>
          </Card>
        </div>

        {/* Wallet Scanner Demo */}
        <Card className="p-6">
          <CardHeader>
            <CardTitle>Quick Wallet Scan</CardTitle>
            <CardDescription>
              Enter a wallet address to get instant analytics
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              <Input
                placeholder="0x742d35Cc6634C0532925a3b8D23dd92BC2e8F634"
                className="flex-1"
                size="lg"
              />
              <HeroButton color="primary" size="lg">
                Scan Wallet
              </HeroButton>
            </div>
            <div className="flex gap-2 flex-wrap">
              <Chip size="sm" variant="flat">ETH</Chip>
              <Chip size="sm" variant="flat">BSC</Chip>
              <Chip size="sm" variant="flat">Polygon</Chip>
              <Chip size="sm" variant="flat">Arbitrum</Chip>
              <Chip size="sm" variant="flat">Optimism</Chip>
            </div>
          </CardContent>
        </Card>

        {/* Component Library Demo */}
        <Card className="p-6">
          <CardHeader>
            <CardTitle>UI Component Examples</CardTitle>
            <CardDescription>
              Showcasing shadcn/ui and Hero UI components working together
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">shadcn/ui Components</h3>
              <div className="flex gap-3 flex-wrap">
                <ShadcnButton>Default</ShadcnButton>
                <ShadcnButton variant="secondary">Secondary</ShadcnButton>
                <ShadcnButton variant="outline">Outline</ShadcnButton>
                <ShadcnButton variant="ghost">Ghost</ShadcnButton>
                <ShadcnButton variant="destructive">Destructive</ShadcnButton>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Hero UI Components</h3>
              <div className="flex gap-3 flex-wrap">
                <HeroButton color="default">Default</HeroButton>
                <HeroButton color="primary">Primary</HeroButton>
                <HeroButton color="secondary">Secondary</HeroButton>
                <HeroButton color="success">Success</HeroButton>
                <HeroButton color="warning">Warning</HeroButton>
                <HeroButton color="danger">Danger</HeroButton>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Forms Demo Link */}
        <Card className="p-6 text-center">
          <CardHeader>
            <CardTitle>🚀 Complete Forms System</CardTitle>
            <CardDescription>
              Experience our comprehensive form handling with Zod validation, React Hook Form, and multi-step wizards
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/forms">
              <HeroButton color="primary" size="lg" className="min-w-48">
                Try Forms Demo →
              </HeroButton>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}