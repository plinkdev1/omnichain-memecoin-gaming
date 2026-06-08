"use client"

import { useEffect, useState } from "react"
import { useWallet, useConnection } from "@solana/wallet-adapter-react"
import { getSolBalance, getDatxBalance, formatAddress } from "@/lib/wallet-utils"
import { saveWalletState, clearWalletState } from "@/lib/wallet-persistence"

interface WalletState {
  isConnected: boolean
  address: string | null
  formattedAddress: string | null
  solBalance: number | null
  datxBalance: number | null
  isLoading: boolean
  error: string | null
  walletName: string | null
}

export function useWalletConnection() {
  const { connected, publicKey, wallet } = useWallet()
  const { connection } = useConnection()
  const [state, setState] = useState<WalletState>({
    isConnected: false,
    address: null,
    formattedAddress: null,
    solBalance: null,
    datxBalance: null,
    isLoading: false,
    error: null,
    walletName: null,
  })

  useEffect(() => {
    if (connected && publicKey) {
      const address = publicKey.toString()
      const walletName = wallet?.adapter.name || null

      saveWalletState(address, walletName || undefined)

      setState((prev) => ({
        ...prev,
        isConnected: true,
        address,
        formattedAddress: formatAddress(address),
        walletName,
        isLoading: true,
      }))

      fetchBalances(publicKey)
    } else {
      clearWalletState()
      setState((prev) => ({
        ...prev,
        isConnected: false,
        address: null,
        formattedAddress: null,
        solBalance: null,
        datxBalance: null,
        walletName: null,
        error: null,
      }))
    }
  }, [connected, publicKey, wallet])

  const fetchBalances = async (publicKey: any) => {
    try {
      const [solBalance, datxBalance] = await Promise.all([
        getSolBalance(connection, publicKey),
        getDatxBalance(connection, publicKey),
      ])

      setState((prev) => ({
        ...prev,
        solBalance,
        datxBalance,
        isLoading: false,
        error: null,
      }))
    } catch (err: any) {
      console.error("[v0] Error fetching balances:", err)
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: err.message || "Failed to fetch balances",
      }))
    }
  }

  const refreshBalances = async () => {
    if (!publicKey) return
    setState((prev) => ({ ...prev, isLoading: true }))
    await fetchBalances(publicKey)
  }

  return {
    ...state,
    refreshBalances,
  }
}
