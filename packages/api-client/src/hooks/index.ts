import { useQuery, useMutation, useQueryClient, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query'
import { walletApi, authApi, health, APIError } from '../index'

// Wallet hooks
export const useWalletScan = (address: string, enabled = true) => {
  return useQuery({
    queryKey: ['wallet', 'scan', address],
    queryFn: () => walletApi.scan(address),
    enabled: enabled && !!address,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  })
}

export const useWalletHistory = (address: string, limit = 50) => {
  return useQuery({
    queryKey: ['wallet', 'history', address, limit],
    queryFn: () => walletApi.getHistory(address, limit),
    enabled: !!address,
    staleTime: 2 * 60 * 1000, // 2 minutes
  })
}

export const useTopPerformers = (timeframe = '24h') => {
  return useQuery({
    queryKey: ['wallet', 'top-performers', timeframe],
    queryFn: () => walletApi.getTopPerformers(timeframe),
    staleTime: 10 * 60 * 1000, // 10 minutes
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
  })
}

export const useWalletSignals = (address: string) => {
  return useQuery({
    queryKey: ['wallet', 'signals', address],
    queryFn: () => walletApi.getSignals(address),
    enabled: !!address,
    staleTime: 60 * 1000, // 1 minute
  })
}

// Mutation hooks
export const useWalletScanMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (address: string) => walletApi.scan(address),
    onSuccess: (data, address) => {
      // Update the cache
      queryClient.setQueryData(['wallet', 'scan', address], data)

      // Invalidate related queries
      queryClient.invalidateQueries({
        queryKey: ['wallet', 'history', address]
      })
      queryClient.invalidateQueries({
        queryKey: ['wallet', 'signals', address]
      })
    },
    onError: (error: APIError) => {
      console.error('Wallet scan failed:', error.message)
    },
  })
}

// Auth hooks
export const useLogin = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (credentials: { email: string; password: string }) =>
      authApi.login(credentials),
    onSuccess: (data) => {
      // Cache user data
      queryClient.setQueryData(['auth', 'me'], { user: data.user })

      // Invalidate and refetch user-specific data
      queryClient.invalidateQueries({ queryKey: ['wallet'] })
    },
  })
}

export const useLogout = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => authApi.logout(),
    onSuccess: () => {
      // Clear all cached data
      queryClient.clear()
    },
  })
}

export const useMe = () => {
  return useQuery({
    queryKey: ['auth', 'me'],
    queryFn: () => authApi.me(),
    staleTime: 10 * 60 * 1000, // 10 minutes
    retry: (failureCount, error: any) => {
      // Don't retry on 401 errors
      if (error?.status === 401) return false
      return failureCount < 3
    },
  })
}

// Health check hook
export const useHealthCheck = () => {
  return useQuery({
    queryKey: ['health'],
    queryFn: health,
    staleTime: 30 * 1000, // 30 seconds
    refetchInterval: 60 * 1000, // Refetch every minute
    retry: 1,
  })
}

// Custom hook for optimistic updates
export const useOptimisticWalletUpdate = () => {
  const queryClient = useQueryClient()

  const updateWallet = (address: string, updates: Partial<any>) => {
    queryClient.setQueryData(
      ['wallet', 'scan', address],
      (old: any) => old ? { ...old, ...updates } : old
    )
  }

  return { updateWallet }
}

// Hook for prefetching related data
export const usePrefetchWalletData = () => {
  const queryClient = useQueryClient()

  const prefetchWallet = (address: string) => {
    // Prefetch wallet scan
    queryClient.prefetchQuery({
      queryKey: ['wallet', 'scan', address],
      queryFn: () => walletApi.scan(address),
      staleTime: 5 * 60 * 1000,
    })

    // Prefetch wallet history
    queryClient.prefetchQuery({
      queryKey: ['wallet', 'history', address],
      queryFn: () => walletApi.getHistory(address),
      staleTime: 2 * 60 * 1000,
    })
  }

  return { prefetchWallet }
}