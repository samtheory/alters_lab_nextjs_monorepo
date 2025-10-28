'use client'

import React from 'react'
import { Button } from '@ui/shared'
import { Input, Progress } from '@heroui/react'
import { useMultiStepForm, useZodForm } from '../hooks'
import { walletAddressSchema, analysisSettingsSchema } from '../schemas'
import { z } from 'zod'

const multiStepSchema = {
  wallet: walletAddressSchema,
  settings: analysisSettingsSchema
}

interface MultiStepWalletFormProps {
  onComplete: (data: any) => Promise<void>
  className?: string
}

export function MultiStepWalletForm({ onComplete, className }: MultiStepWalletFormProps) {
  const {
    currentStep,
    currentStepIndex,
    totalSteps,
    isFirstStep,
    isLastStep,
    goToNextStep,
    goToPreviousStep,
    completeStep,
    getAllFormData,
    resetForm
  } = useMultiStepForm(multiStepSchema, 'wallet')

  const currentSchema = multiStepSchema[currentStep as keyof typeof multiStepSchema]

  const form = useZodForm(currentSchema, {
    defaultValues: currentStep === 'wallet'
      ? { address: '' }
      : {
        timeframe: '24h',
        minTransactions: 10,
        minVolume: 1000,
        alertThreshold: 5,
        includeTokens: [],
        excludeTokens: []
      }
  })

  const handleStepSubmit = async (data: any) => {
    completeStep(currentStep, data)

    if (isLastStep) {
      const allData = { ...getAllFormData(), [currentStep]: data }
      await onComplete(allData)
    } else {
      goToNextStep()
      form.reset()
    }
  }

  const progress = ((currentStepIndex + 1) / totalSteps) * 100

  return (
    <div className={`space-y-6 max-w-2xl mx-auto ${className || ''}`}>
      {/* Progress Indicator */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Step {currentStepIndex + 1} of {totalSteps}</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <Progress
          value={progress}
          className="w-full"
          color="primary"
        />
      </div>

      {/* Step Content */}
      <div className="space-y-6">
        {currentStep === 'wallet' && (
          <div>
            <h2 className="text-2xl font-bold mb-2">Enter Wallet Address</h2>
            <p className="text-gray-600 mb-6">
              Provide the Ethereum wallet address you want to analyze
            </p>

            <form onSubmit={form.handleSubmit(handleStepSubmit)} className="space-y-4">
              <Input
                {...form.register('address')}
                label="Wallet Address"
                placeholder="0x1234..."
                variant="bordered"
                isInvalid={!!form.formState.errors.address}
                errorMessage={form.formState.errors.address?.message}
                description="Enter a valid Ethereum wallet address"
              />

              <div className="flex gap-4 pt-4">
                <Button
                  type="submit"
                  className="flex-1"
                  disabled={!form.formState.isValid}
                >
                  Continue
                </Button>
              </div>
            </form>
          </div>
        )}

        {currentStep === 'settings' && (
          <div>
            <h2 className="text-2xl font-bold mb-2">Analysis Settings</h2>
            <p className="text-gray-600 mb-6">
              Configure how you want to analyze the wallet data
            </p>

            <form onSubmit={form.handleSubmit(handleStepSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  {...form.register('minTransactions', { valueAsNumber: true })}
                  label="Minimum Transactions"
                  type="number"
                  placeholder="10"
                  variant="bordered"
                  isInvalid={!!form.formState.errors.minTransactions}
                  errorMessage={form.formState.errors.minTransactions?.message}
                />

                <Input
                  {...form.register('minVolume', { valueAsNumber: true })}
                  label="Minimum Volume ($)"
                  type="number"
                  placeholder="1000"
                  variant="bordered"
                  isInvalid={!!form.formState.errors.minVolume}
                  errorMessage={form.formState.errors.minVolume?.message}
                />
              </div>

              <Input
                {...form.register('alertThreshold', { valueAsNumber: true })}
                label="Alert Threshold (%)"
                type="number"
                placeholder="5"
                variant="bordered"
                isInvalid={!!form.formState.errors.alertThreshold}
                errorMessage={form.formState.errors.alertThreshold?.message}
                step="0.01"
              />

              <div className="flex gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={goToPreviousStep}
                  className="flex-1"
                  disabled={isFirstStep}
                >
                  Back
                </Button>

                <Button
                  type="submit"
                  className="flex-1"
                >
                  Complete Analysis
                </Button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* Step Navigation */}
      <div className="flex justify-center space-x-2">
        {Array.from({ length: totalSteps }, (_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full ${index <= currentStepIndex
                ? 'bg-blue-600'
                : 'bg-gray-300'
              }`}
          />
        ))}
      </div>
    </div>
  )
}