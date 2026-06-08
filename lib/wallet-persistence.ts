"use client"

const WALLET_STATE_KEY = "datxit-wallet-state"
const WALLET_CONNECT_TIME_KEY = "datxit-wallet-connect-time"
const WALLET_NAME_KEY = "datxit-wallet-name"
const WALLET_EXPIRY_DAYS = 7

/**
 * Save wallet state to localStorage
 */
export function saveWalletState(address: string, walletName?: string) {
  if (typeof window === "undefined") return

  try {
    localStorage.setItem(WALLET_STATE_KEY, address)
    localStorage.setItem(WALLET_CONNECT_TIME_KEY, Date.now().toString())
    if (walletName) {
      localStorage.setItem(WALLET_NAME_KEY, walletName)
    }
  } catch (error) {
    console.error("[v0] Error saving wallet state:", error)
  }
}

/**
 * Get persisted wallet address from localStorage
 */
export function getPersistedWalletAddress(): string | null {
  if (typeof window === "undefined") return null

  try {
    const address = localStorage.getItem(WALLET_STATE_KEY)
    if (address && !isWalletStateExpired()) {
      return address
    }
    clearWalletState()
    return null
  } catch (error) {
    console.error("[v0] Error getting wallet state:", error)
    return null
  }
}

/**
 * Get persisted wallet name
 */
export function getPersistedWalletName(): string | null {
  if (typeof window === "undefined") return null

  try {
    return localStorage.getItem(WALLET_NAME_KEY)
  } catch (error) {
    return null
  }
}

/**
 * Clear wallet state from localStorage
 */
export function clearWalletState() {
  if (typeof window === "undefined") return

  try {
    localStorage.removeItem(WALLET_STATE_KEY)
    localStorage.removeItem(WALLET_CONNECT_TIME_KEY)
    localStorage.removeItem(WALLET_NAME_KEY)
  } catch (error) {
    console.error("[v0] Error clearing wallet state:", error)
  }
}

/**
 * Check if wallet state has expired (7 days)
 */
export function isWalletStateExpired(): boolean {
  if (typeof window === "undefined") return true

  try {
    const connectTime = localStorage.getItem(WALLET_CONNECT_TIME_KEY)
    if (!connectTime) return true

    const expiryMs = WALLET_EXPIRY_DAYS * 24 * 60 * 60 * 1000
    return Date.now() - Number.parseInt(connectTime) > expiryMs
  } catch (error) {
    return true
  }
}
