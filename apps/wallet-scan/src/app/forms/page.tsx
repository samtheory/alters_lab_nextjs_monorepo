'use client'

import { useState } from 'react'
import { WalletScanForm, AuthForm, UserProfileForm, SettingsForm, MultiStepWalletForm } from '@forms/shared'
import type {
  WalletAddressFormData,
  LoginFormData,
  RegisterFormData,
  ProfileFormData,
  AnalysisSettingsFormData
} from '@forms/shared'
import { Card, CardBody, Tab, Tabs } from '@heroui/react'
import { useWalletStore } from '@store/shared'

export default function FormsPage() {
  const [activeTab, setActiveTab] = useState('wallet-scan')
  const { addScannedWallet } = useWalletStore()

  const handleWalletScan = async (data: WalletAddressFormData) => {
    console.log('Scanning wallet:', data.address)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Add mock result to store
    addScannedWallet({
      address: data.address,
      balance: '1,234.56 ETH',
      transactions: Math.floor(Math.random() * 1000),
      lastActivity: new Date().toISOString(),
      profitLoss: {
        total: Math.random() * 100000,
        percentage: Math.random() * 100
      },
      assets: [
        { symbol: 'ETH', amount: '1234.56', value: 2345678 },
        { symbol: 'USDC', amount: '50000', value: 50000 },
      ]
    })
  }

  const handleAuth = async (data: LoginFormData | RegisterFormData) => {
    console.log('Auth data:', data)
    await new Promise(resolve => setTimeout(resolve, 1500))
  }

  const handleProfile = async (data: ProfileFormData) => {
    console.log('Profile data:', data)
    await new Promise(resolve => setTimeout(resolve, 1000))
  }

  const handleSettings = async (data: AnalysisSettingsFormData) => {
    console.log('Settings data:', data)
    await new Promise(resolve => setTimeout(resolve, 1000))
  }

  const handleMultiStep = async (data: Record<string, unknown>) => {
    console.log('Multi-step data:', data)
    await new Promise(resolve => setTimeout(resolve, 2000))
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Forms Demo</h1>
        <p className="text-lg text-gray-600">
          Comprehensive form handling with Zod validation and React Hook Form
        </p>
      </div>

      <Tabs
        selectedKey={activeTab}
        onSelectionChange={(key) => setActiveTab(key as string)}
        className="w-full"
      >
        <Tab key="wallet-scan" title="Wallet Scanner">
          <Card>
            <CardBody>
              <WalletScanForm
                onSubmit={handleWalletScan}
                className="max-w-md mx-auto"
              />
            </CardBody>
          </Card>
        </Tab>

        <Tab key="auth" title="Authentication">
          <Card>
            <CardBody>
              <AuthForm
                mode="login"
                onSubmit={handleAuth}
                className="max-w-md mx-auto"
              />
            </CardBody>
          </Card>
        </Tab>

        <Tab key="profile" title="User Profile">
          <Card>
            <CardBody>
              <UserProfileForm
                onSubmit={handleProfile}
                defaultValues={{
                  name: 'John Doe',
                  email: 'john@example.com',
                  bio: 'Crypto enthusiast and DeFi trader'
                }}
              />
            </CardBody>
          </Card>
        </Tab>

        <Tab key="settings" title="Settings">
          <Card>
            <CardBody>
              <SettingsForm
                onSubmit={handleSettings}
                className="max-w-2xl mx-auto"
              />
            </CardBody>
          </Card>
        </Tab>

        <Tab key="multi-step" title="Multi-Step">
          <Card>
            <CardBody>
              <MultiStepWalletForm
                onComplete={handleMultiStep}
              />
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  )
}