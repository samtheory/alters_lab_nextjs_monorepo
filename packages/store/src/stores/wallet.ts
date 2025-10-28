import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { persist } from 'zustand/middleware'

export interface WalletData {
  address: string
  balance: string
  transactions: number
  lastActivity: string
  profitLoss: {
    total: number
    percentage: number
  }
  assets: {
    symbol: string
    amount: string
    value: number
  }[]
}

interface WalletState {
  // State
  scannedWallets: WalletData[]
  currentWallet: WalletData | null
  isScanning: boolean
  scanError: string | null
  highPotentialWallets: WalletData[]

  // Actions
  scanWallet: (address: string) => Promise<void>
  setCurrentWallet: (wallet: WalletData | null) => void
  addScannedWallet: (wallet: WalletData) => void
  clearScanError: () => void
  setHighPotentialWallets: (wallets: WalletData[]) => void
}

export const useWalletStore = create<WalletState>()(
  persist(
    immer((set, get) => ({
      // Initial state
      scannedWallets: [],
      currentWallet: null,
      isScanning: false,
      scanError: null,
      highPotentialWallets: [],

      // Actions
      scanWallet: async (address: string) => {
        set((state) => {
          state.isScanning = true
          state.scanError = null
        })

        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 2000))

          const mockWallet: WalletData = {
            address,
            balance: '1,234.56 ETH',
            transactions: Math.floor(Math.random() * 1000) + 100,
            lastActivity: new Date().toISOString(),
            profitLoss: {
              total: Math.random() * 100000 - 50000,
              percentage: Math.random() * 200 - 100,
            },
            assets: [
              { symbol: 'ETH', amount: '1234.56', value: 2345678 },
              { symbol: 'USDC', amount: '50000', value: 50000 },
              { symbol: 'LINK', amount: '1000', value: 15000 },
            ]
          }

          set((state) => {
            state.currentWallet = mockWallet
            state.isScanning = false

            // Add to scanned wallets if not already there
            const exists = state.scannedWallets.find(w => w.address === address)
            if (!exists) {
              state.scannedWallets.unshift(mockWallet)
              // Keep only last 10 scanned wallets
              if (state.scannedWallets.length > 10) {
                state.scannedWallets = state.scannedWallets.slice(0, 10)
              }
            }
          })

        } catch (error) {
          set((state) => {
            state.isScanning = false
            state.scanError = error instanceof Error ? error.message : 'Failed to scan wallet'
          })
        }
      },

      setCurrentWallet: (wallet) => {
        set((state) => {
          state.currentWallet = wallet
        })
      },

      addScannedWallet: (wallet) => {
        set((state) => {
          const exists = state.scannedWallets.find(w => w.address === wallet.address)
          if (!exists) {
            state.scannedWallets.unshift(wallet)
            if (state.scannedWallets.length > 10) {
              state.scannedWallets = state.scannedWallets.slice(0, 10)
            }
          }
        })
      },

      clearScanError: () => {
        set((state) => {
          state.scanError = null
        })
      },

      setHighPotentialWallets: (wallets) => {
        set((state) => {
          state.highPotentialWallets = wallets
        })
      },
    })),
    {
      name: 'wallet-scanner-storage',
      partialize: (state) => ({
        scannedWallets: state.scannedWallets,
        highPotentialWallets: state.highPotentialWallets,
      }),
    }
  )
)