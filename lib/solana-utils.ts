import { Connection, PublicKey, Transaction, LAMPORTS_PER_SOL } from "@solana/web3.js"
import { createTransferInstruction, getAssociatedTokenAddress, TOKEN_PROGRAM_ID } from "@solana/spl-token"

// $DATX Token mint address (update with real address after deployment)
export const DATX_MINT = new PublicKey("11111111111111111111111111111111") // Placeholder

// Note: Using Alchemy's Solana RPC endpoint
// NEXT_PUBLIC_ALCHEMY_API_KEY is a public client-side key with rate limiting
// This is the standard pattern for client-side RPC access
const ALCHEMY_RPC_URL = `https://solana-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY || ""}`
export const RPC_ENDPOINT = ALCHEMY_RPC_URL

export function getConnection(): Connection {
  return new Connection(RPC_ENDPOINT, "confirmed")
}

export async function createTipTransaction(
  fromWallet: PublicKey,
  toWallet: PublicKey,
  amount: number,
): Promise<Transaction> {
  const connection = getConnection()

  const fromTokenAccount = await getAssociatedTokenAddress(DATX_MINT, fromWallet)
  const toTokenAccount = await getAssociatedTokenAddress(DATX_MINT, toWallet)

  const transaction = new Transaction()

  const transferInstruction = createTransferInstruction(
    fromTokenAccount,
    toTokenAccount,
    fromWallet,
    amount * LAMPORTS_PER_SOL,
    [],
    TOKEN_PROGRAM_ID,
  )

  transaction.add(transferInstruction)

  const { blockhash } = await connection.getLatestBlockhash()
  transaction.recentBlockhash = blockhash
  transaction.feePayer = fromWallet

  return transaction
}

export async function createBurnTransaction(
  fromWallet: PublicKey,
  amount: number,
  deadWallet: PublicKey,
  treasuryWallet: PublicKey,
): Promise<Transaction> {
  const connection = getConnection()

  const burnAmount = Math.floor(amount * 0.9 * LAMPORTS_PER_SOL)
  const treasuryAmount = Math.floor(amount * 0.1 * LAMPORTS_PER_SOL)

  const fromTokenAccount = await getAssociatedTokenAddress(DATX_MINT, fromWallet)
  const deadTokenAccount = await getAssociatedTokenAddress(DATX_MINT, deadWallet)
  const treasuryTokenAccount = await getAssociatedTokenAddress(DATX_MINT, treasuryWallet)

  const transaction = new Transaction()

  const burnInstruction = createTransferInstruction(
    fromTokenAccount,
    deadTokenAccount,
    fromWallet,
    burnAmount,
    [],
    TOKEN_PROGRAM_ID,
  )
  transaction.add(burnInstruction)

  const treasuryInstruction = createTransferInstruction(
    fromTokenAccount,
    treasuryTokenAccount,
    fromWallet,
    treasuryAmount,
    [],
    TOKEN_PROGRAM_ID,
  )
  transaction.add(treasuryInstruction)

  const { blockhash } = await connection.getLatestBlockhash()
  transaction.recentBlockhash = blockhash
  transaction.feePayer = fromWallet

  return transaction
}

export function getWeekNumber(date: Date = new Date()): { week: number; year: number } {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1)
  const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000
  const weekNumber = Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7)
  return { week: weekNumber, year: date.getFullYear() }
}
