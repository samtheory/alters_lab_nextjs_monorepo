'use client'

import React, { useState } from 'react'
import { Button } from '@ui/shared'
import { Input } from '@heroui/react'
import { useZodForm, useFormSubmission } from '../hooks'
import { loginSchema, registerSchema, LoginFormData, RegisterFormData } from '../schemas'
import { AuthFormProps } from './types'

export function AuthForm({
  mode,
  onSubmit,
  onModeChange,
  className
}: AuthFormProps) {
  const schema = mode === 'login' ? loginSchema : registerSchema

  const form = useZodForm(schema, {
    defaultValues: mode === 'login'
      ? { email: '', password: '', rememberMe: false }
      : { email: '', password: '', confirmPassword: '', name: '', terms: false }
  })

  const { handleSubmit, isSubmitting, error, success } = useFormSubmission<LoginFormData | RegisterFormData>(onSubmit)

  const onFormSubmit = (data: any) => {
    handleSubmit(data)
  }

  return (
    <div className={`space-y-6 ${className || ''}`}>
      <div className="text-center">
        <h2 className="text-2xl font-bold">
          {mode === 'login' ? 'Sign In' : 'Create Account'}
        </h2>
        <p className="text-gray-600 mt-2">
          {mode === 'login'
            ? 'Enter your credentials to access your account'
            : 'Fill in your details to get started'
          }
        </p>
      </div>

      <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-4">
        {mode === 'register' && (
          <Input
            {...form.register('name')}
            label="Full Name"
            placeholder="Enter your name"
            variant="bordered"
            isInvalid={!!form.formState.errors.name}
            errorMessage={form.formState.errors.name?.message}
          />
        )}

        <Input
          {...form.register('email')}
          label="Email"
          type="email"
          placeholder="Enter your email"
          variant="bordered"
          isInvalid={!!form.formState.errors.email}
          errorMessage={form.formState.errors.email?.message}
        />

        <Input
          {...form.register('password')}
          label="Password"
          type="password"
          placeholder="Enter your password"
          variant="bordered"
          isInvalid={!!form.formState.errors.password}
          errorMessage={form.formState.errors.password?.message}
        />

        {mode === 'register' && (
          <Input
            {...form.register('confirmPassword')}
            label="Confirm Password"
            type="password"
            placeholder="Confirm your password"
            variant="bordered"
            isInvalid={!!form.formState.errors.confirmPassword}
            errorMessage={form.formState.errors.confirmPassword?.message}
          />
        )}

        {error && (
          <div className="p-3 rounded-md bg-red-50 border border-red-200 text-red-700">
            <p className="text-sm">{error}</p>
          </div>
        )}

        {success && (
          <div className="p-3 rounded-md bg-green-50 border border-green-200 text-green-700">
            <p className="text-sm">
              {mode === 'login' ? 'Login successful!' : 'Account created successfully!'}
            </p>
          </div>
        )}

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full"
        >
          {isSubmitting
            ? (mode === 'login' ? 'Signing in...' : 'Creating account...')
            : (mode === 'login' ? 'Sign In' : 'Create Account')
          }
        </Button>
      </form>

      {onModeChange && (
        <div className="text-center">
          <p className="text-sm text-gray-600">
            {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
            <button
              type="button"
              onClick={() => onModeChange(mode === 'login' ? 'register' : 'login')}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              {mode === 'login' ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>
      )}
    </div>
  )
}