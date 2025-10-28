'use client'

import React from 'react'
import { Button } from '@ui/shared'
import { Input } from '@heroui/react'
import { useZodForm, useFormSubmission } from '../hooks'
import { walletAddressSchema, WalletAddressFormData } from '../schemas'
import { WalletScanFormProps } from './types'

export function WalletScanForm({
  onSubmit,
  defaultValues,
  className
}: WalletScanFormProps) {
  const form = useZodForm(walletAddressSchema, {
    defaultValues: defaultValues || { address: '' }
  })

  const { handleSubmit, isSubmitting, error, success } = useFormSubmission<WalletAddressFormData>(onSubmit)

  const onFormSubmit = (data: Partial<WalletAddressFormData>) => {
    if (data.address) {
      handleSubmit(data as WalletAddressFormData)
    }
  }

  return (
    <form
      onSubmit={form.handleSubmit(onFormSubmit)}
      className={`space-y-4 ${className || ''}`}
    >
      <div className="space-y-2">
        <Input
          {...form.register('address')}
          label="Wallet Address"
          placeholder="0x1234..."
          variant="bordered"
          isInvalid={!!form.formState.errors.address}
          errorMessage={form.formState.errors.address?.message}
          description="Enter an Ethereum wallet address to analyze"
        />
      </div>

      {error && (
        <div className="p-3 rounded-md bg-red-50 border border-red-200 text-red-700">
          <p className="text-sm">{error}</p>
        </div>
      )}

      {success && (
        <div className="p-3 rounded-md bg-green-50 border border-green-200 text-green-700">
          <p className="text-sm">Wallet scan initiated successfully!</p>
        </div>
      )}

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full"
      >
        {isSubmitting ? 'Scanning...' : 'Scan Wallet'}
      </Button>
    </form>
  )
}