import { z } from 'zod'
import { walletAddressSchema, loginSchema, registerSchema, profileSchema, analysisSettingsSchema } from '../schemas'

export interface WalletScanFormProps {
  onSubmit: (data: z.infer<typeof walletAddressSchema>) => Promise<void>
  defaultValues?: Partial<z.infer<typeof walletAddressSchema>>
  className?: string
}

export interface AuthFormProps {
  mode: 'login' | 'register'
  onSubmit: (data: z.infer<typeof loginSchema> | z.infer<typeof registerSchema>) => Promise<void>
  onModeChange?: (mode: 'login' | 'register') => void
  className?: string
}

export interface UserProfileFormProps {
  onSubmit: (data: z.infer<typeof profileSchema>) => Promise<void>
  defaultValues?: Partial<z.infer<typeof profileSchema>>
  className?: string
}

export interface SettingsFormProps {
  onSubmit: (data: z.infer<typeof analysisSettingsSchema>) => Promise<void>
  defaultValues?: Partial<z.infer<typeof analysisSettingsSchema>>
  className?: string
}