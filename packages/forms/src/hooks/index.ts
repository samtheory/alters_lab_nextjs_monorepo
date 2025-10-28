// Import React hooks
import { useState, useEffect } from 'react'
import { useForm, UseFormProps, FieldValues, Path } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

// Enhanced useForm hook with Zod integration
export function useZodForm<TSchema extends z.ZodSchema, TFieldValues extends FieldValues = z.infer<TSchema>>(
  schema: TSchema,
  options?: Omit<UseFormProps<TFieldValues>, 'resolver'>
) {
  return useForm<TFieldValues>({
    resolver: zodResolver(schema),
    ...options,
  })
}

// Hook for handling form submissions with loading states
export function useFormSubmission<TData extends FieldValues>(
  onSubmit: (data: TData) => Promise<void> | void
) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (data: TData) => {
    setIsSubmitting(true)
    setError(null)
    setSuccess(false)

    try {
      await onSubmit(data)
      setSuccess(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetStatus = () => {
    setError(null)
    setSuccess(false)
  }

  return {
    handleSubmit,
    isSubmitting,
    error,
    success,
    resetStatus,
  }
}

// Hook for field-level validation
export function useFieldValidation<TFieldValues extends FieldValues>(
  fieldName: Path<TFieldValues>,
  schema: z.ZodSchema
) {
  const validateField = (value: any) => {
    try {
      schema.parse(value)
      return true
    } catch (error) {
      if (error instanceof z.ZodError) {
        return error.errors[0]?.message || 'Invalid value'
      }
      return 'Validation error'
    }
  }

  return { validateField }
}

// Hook for auto-save functionality
export function useAutoSave<TData extends FieldValues>(
  data: TData,
  saveFunction: (data: TData) => Promise<void>,
  delay = 2000
) {
  const [isSaving, setIsSaving] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (Object.keys(data).length > 0) {
        setIsSaving(true)
        try {
          await saveFunction(data)
          setLastSaved(new Date())
        } catch (error) {
          console.error('Auto-save failed:', error)
        } finally {
          setIsSaving(false)
        }
      }
    }, delay)

    return () => clearTimeout(timeoutId)
  }, [data, saveFunction, delay])

  return { isSaving, lastSaved }
}

// Custom hook for multi-step forms
export function useMultiStepForm<TSteps extends Record<string, z.ZodSchema>>(
  steps: TSteps,
  initialStep: keyof TSteps
) {
  const [currentStep, setCurrentStep] = useState<keyof TSteps>(initialStep)
  const [completedSteps, setCompletedSteps] = useState<Set<keyof TSteps>>(new Set())
  const [formData, setFormData] = useState<Record<string, any>>({})

  const stepKeys = Object.keys(steps) as Array<keyof TSteps>
  const currentStepIndex = stepKeys.indexOf(currentStep)
  const isFirstStep = currentStepIndex === 0
  const isLastStep = currentStepIndex === stepKeys.length - 1

  const goToNextStep = () => {
    if (!isLastStep) {
      setCurrentStep(stepKeys[currentStepIndex + 1])
    }
  }

  const goToPreviousStep = () => {
    if (!isFirstStep) {
      setCurrentStep(stepKeys[currentStepIndex - 1])
    }
  }

  const goToStep = (step: keyof TSteps) => {
    setCurrentStep(step)
  }

  const completeStep = (step: keyof TSteps, data: any) => {
    setCompletedSteps(prev => new Set([...prev, step]))
    setFormData(prev => ({ ...prev, [step]: data }))
  }

  const isStepCompleted = (step: keyof TSteps) => {
    return completedSteps.has(step)
  }

  const getAllFormData = () => {
    return formData
  }

  const resetForm = () => {
    setCurrentStep(initialStep)
    setCompletedSteps(new Set())
    setFormData({})
  }

  return {
    currentStep,
    currentStepIndex,
    totalSteps: stepKeys.length,
    isFirstStep,
    isLastStep,
    goToNextStep,
    goToPreviousStep,
    goToStep,
    completeStep,
    isStepCompleted,
    getAllFormData,
    resetForm,
    stepKeys,
  }
}