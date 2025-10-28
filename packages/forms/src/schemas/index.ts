import { z } from 'zod'

// Wallet address schema
export const walletAddressSchema = z.object({
  address: z
    .string()
    .min(1, 'Wallet address is required')
    .regex(/^0x[a-fA-F0-9]{40}$/, 'Invalid Ethereum wallet address')
})

// Auth schemas
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Invalid email address'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .max(100, 'Password is too long'),
  rememberMe: z.boolean().optional()
})

export const registerSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Invalid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(100, 'Password is too long')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one lowercase letter, one uppercase letter, and one number'),
  confirmPassword: z.string(),
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name is too long'),
  terms: z.boolean().refine((val) => val === true, 'You must accept the terms and conditions')
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

// Profile schema
export const profileSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name is too long'),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Invalid email address'),
  bio: z
    .string()
    .max(500, 'Bio is too long')
    .optional(),
  avatar: z
    .string()
    .url('Invalid avatar URL')
    .optional(),
  notifications: z.object({
    email: z.boolean(),
    push: z.boolean(),
    trades: z.boolean(),
    signals: z.boolean()
  }).optional()
})

// Wallet analysis settings schema
export const analysisSettingsSchema = z.object({
  timeframe: z.enum(['1h', '24h', '7d', '30d'], {
    required_error: 'Please select a timeframe'
  }),
  minTransactions: z
    .number()
    .min(1, 'Minimum transactions must be at least 1')
    .max(10000, 'Maximum limit exceeded'),
  minVolume: z
    .number()
    .min(0, 'Minimum volume cannot be negative')
    .max(1000000, 'Maximum volume exceeded'),
  includeTokens: z.array(z.string()).optional(),
  excludeTokens: z.array(z.string()).optional(),
  alertThreshold: z
    .number()
    .min(0.01, 'Alert threshold too low')
    .max(100, 'Alert threshold too high')
})

// Contact/Support schema
export const contactSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name is too long'),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Invalid email address'),
  subject: z
    .string()
    .min(5, 'Subject must be at least 5 characters')
    .max(200, 'Subject is too long'),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(2000, 'Message is too long'),
  category: z.enum(['bug', 'feature', 'support', 'other'], {
    required_error: 'Please select a category'
  })
})

// Export type inference
export type WalletAddressFormData = z.infer<typeof walletAddressSchema>
export type LoginFormData = z.infer<typeof loginSchema>
export type RegisterFormData = z.infer<typeof registerSchema>
export type ProfileFormData = z.infer<typeof profileSchema>
export type AnalysisSettingsFormData = z.infer<typeof analysisSettingsSchema>
export type ContactFormData = z.infer<typeof contactSchema>