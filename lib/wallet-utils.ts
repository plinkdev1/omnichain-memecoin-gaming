import { type Connection, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js"

const DATX_MINT = "5jVMD1aMPWJgXJkixpNvnN8Ny4rUpQ7m8beFDkR9YnR1"

export async function getSolBalance(connection: Connection, publicKey: PublicKey): Promise<number> {
  try {
    const balance = await connection.getBalance(publicKey)
    return balance / LAMPORTS_PER_SOL
  } catch (error) {
    console.error("[v0] Error fetching SOL balance:", error)
    return 0
  }
}

export async function getDatxBalance(connection: Connection, publicKey: PublicKey): Promise<number> {
  try {
    const mintPubkey = new PublicKey(DATX_MINT)
    const tokenAccounts = await connection.getTokenAccountsByOwner(publicKey, { mint: mintPubkey })

    if (tokenAccounts.value.length === 0) {
      return 0
    }

    let totalBalance = 0
    for (const account of tokenAccounts.value) {
      try {
        const accountInfo = await connection.getParsedAccountInfo(account.pubkey)
        if (accountInfo?.value?.data) {
          const parsedData = (accountInfo.value.data as any).parsed?.info
          if (parsedData?.tokenAmount?.uiAmount) {
            totalBalance += parsedData.tokenAmount.uiAmount
          }
        }
      } catch (err) {
        console.error("[v0] Error parsing token account:", err)
      }
    }

    return totalBalance
  } catch (error) {
    console.error("[v0] Error fetching DATX balance:", error)
    return 0
  }
}

export function formatAddress(address: string): string {
  if (!address) return ""
  if (address.length <= 16) return address
  return `${address.slice(0, 8)}...${address.slice(-8)}`
}

export function getWalletIcon(walletName: string): string {
  const iconMap: Record<string, string> = {
    Phantom: "https://wallet-selector.imgix.net/phantom-dark.svg",
    Solflare: "https://wallet-selector.imgix.net/solflare.svg",
    Ledger: "https://wallet-selector.imgix.net/ledger.svg",
  }
  return iconMap[walletName] || ""
}

export async function isWalletInstalled(walletName: string): Promise<boolean> {
  if (typeof window === "undefined") return false

  const installedChecks: Record<string, () => boolean> = {
    Phantom: () => (window as any).phantom?.solana?.isPhantom === true,
    Solflare: () => (window as any).solflare?.isConnected !== undefined,
    Ledger: () => (window as any).LedgerSolanaApp !== undefined,
  }

  const check = installedChecks[walletName]
  return check ? check() : false
}
