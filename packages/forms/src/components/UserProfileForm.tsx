'use client'

import React from 'react'
import { Button } from '@ui/shared'
import { Input, Textarea, Switch } from '@heroui/react'
import { useZodForm, useFormSubmission } from '../hooks'
import { profileSchema, ProfileFormData } from '../schemas'
import { UserProfileFormProps } from './types'

export function UserProfileForm({
  onSubmit,
  defaultValues,
  className
}: UserProfileFormProps) {
  const form = useZodForm(profileSchema, {
    defaultValues: defaultValues || {
      name: '',
      email: '',
      bio: '',
      avatar: '',
      notifications: {
        email: true,
        push: true,
        trades: true,
        signals: true
      }
    }
  })

  const { handleSubmit, isSubmitting, error, success } = useFormSubmission<ProfileFormData>(onSubmit)

  const onFormSubmit = (data: any) => {
    handleSubmit(data)
  }

  return (
    <div className={`space-y-6 ${className || ''}`}>
      <div className="text-center">
        <h2 className="text-2xl font-bold">Profile Settings</h2>
        <p className="text-gray-600 mt-2">
          Manage your personal information and preferences
        </p>
      </div>

      <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            {...form.register('name')}
            label="Full Name"
            placeholder="Enter your name"
            variant="bordered"
            isInvalid={!!form.formState.errors.name}
            errorMessage={form.formState.errors.name?.message}
          />

          <Input
            {...form.register('email')}
            label="Email"
            type="email"
            placeholder="Enter your email"
            variant="bordered"
            isInvalid={!!form.formState.errors.email}
            errorMessage={form.formState.errors.email?.message}
          />
        </div>

        <Input
          {...form.register('avatar')}
          label="Avatar URL"
          placeholder="https://example.com/avatar.jpg"
          variant="bordered"
          isInvalid={!!form.formState.errors.avatar}
          errorMessage={form.formState.errors.avatar?.message}
        />

        <Textarea
          {...form.register('bio')}
          label="Bio"
          placeholder="Tell us about yourself..."
          variant="bordered"
          minRows={3}
          isInvalid={!!form.formState.errors.bio}
          errorMessage={form.formState.errors.bio?.message}
        />

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Notification Preferences</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Switch
              {...form.register('notifications.email')}
              defaultSelected={form.getValues('notifications.email')}
            >
              Email Notifications
            </Switch>

            <Switch
              {...form.register('notifications.push')}
              defaultSelected={form.getValues('notifications.push')}
            >
              Push Notifications
            </Switch>

            <Switch
              {...form.register('notifications.trades')}
              defaultSelected={form.getValues('notifications.trades')}
            >
              Trade Alerts
            </Switch>

            <Switch
              {...form.register('notifications.signals')}
              defaultSelected={form.getValues('notifications.signals')}
            >
              Signal Notifications
            </Switch>
          </div>
        </div>

        {error && (
          <div className="p-3 rounded-md bg-red-50 border border-red-200 text-red-700">
            <p className="text-sm">{error}</p>
          </div>
        )}

        {success && (
          <div className="p-3 rounded-md bg-green-50 border border-green-200 text-green-700">
            <p className="text-sm">Profile updated successfully!</p>
          </div>
        )}

        <div className="flex gap-4">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="flex-1"
          >
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={() => form.reset()}
            className="flex-1"
          >
            Reset
          </Button>
        </div>
      </form>
    </div>
  )
}