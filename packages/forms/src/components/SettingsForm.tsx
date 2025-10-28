'use client'

import React from 'react'
import { Button } from '@ui/shared'
import { Input, Select, SelectItem } from '@heroui/react'
import { useZodForm, useFormSubmission } from '../hooks'
import { analysisSettingsSchema, AnalysisSettingsFormData } from '../schemas'
import { SettingsFormProps } from './types'

export function SettingsForm({
  onSubmit,
  defaultValues,
  className
}: SettingsFormProps) {
  const form = useZodForm(analysisSettingsSchema, {
    defaultValues: defaultValues || {
      timeframe: '24h',
      minTransactions: 10,
      minVolume: 1000,
      alertThreshold: 5,
      includeTokens: [],
      excludeTokens: []
    }
  })

  const { handleSubmit, isSubmitting, error, success } = useFormSubmission<AnalysisSettingsFormData>(onSubmit)

  const onFormSubmit = (data: any) => {
    handleSubmit(data)
  }

  const timeframeOptions = [
    { value: '1h', label: '1 Hour' },
    { value: '24h', label: '24 Hours' },
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' }
  ]

  return (
    <div className={`space-y-6 ${className || ''}`}>
      <div className="text-center">
        <h2 className="text-2xl font-bold">Analysis Settings</h2>
        <p className="text-gray-600 mt-2">
          Configure your wallet analysis preferences
        </p>
      </div>

      <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Analysis Timeframe"
            placeholder="Select timeframe"
            variant="bordered"
            defaultSelectedKeys={['24h']}
            onSelectionChange={(keys) => {
              const value = Array.from(keys)[0] as string
              form.setValue('timeframe', value as any)
            }}
          >
            {timeframeOptions.map((option) => (
              <SelectItem key={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </Select>

          <Input
            {...form.register('alertThreshold', { valueAsNumber: true })}
            label="Alert Threshold (%)"
            type="number"
            placeholder="5"
            variant="bordered"
            isInvalid={!!form.formState.errors.alertThreshold}
            errorMessage={form.formState.errors.alertThreshold?.message}
            step="0.01"
            min="0.01"
            max="100"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            {...form.register('minTransactions', { valueAsNumber: true })}
            label="Minimum Transactions"
            type="number"
            placeholder="10"
            variant="bordered"
            isInvalid={!!form.formState.errors.minTransactions}
            errorMessage={form.formState.errors.minTransactions?.message}
            min="1"
            max="10000"
          />

          <Input
            {...form.register('minVolume', { valueAsNumber: true })}
            label="Minimum Volume ($)"
            type="number"
            placeholder="1000"
            variant="bordered"
            isInvalid={!!form.formState.errors.minVolume}
            errorMessage={form.formState.errors.minVolume?.message}
            min="0"
            max="1000000"
          />
        </div>

        {error && (
          <div className="p-3 rounded-md bg-red-50 border border-red-200 text-red-700">
            <p className="text-sm">{error}</p>
          </div>
        )}

        {success && (
          <div className="p-3 rounded-md bg-green-50 border border-green-200 text-green-700">
            <p className="text-sm">Settings saved successfully!</p>
          </div>
        )}

        <div className="flex gap-4">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="flex-1"
          >
            {isSubmitting ? 'Saving...' : 'Save Settings'}
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={() => form.reset()}
            className="flex-1"
          >
            Reset to Defaults
          </Button>
        </div>
      </form>
    </div>
  )
}