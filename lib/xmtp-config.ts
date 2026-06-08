// XMTP Public Group Configuration
// These group addresses will be created via XMTP dev tools
export const PUBLIC_GROUPS = {
  mainSewer: "mainSewer@datxit.sewer", // General shitposting
  raidX: "raidx@datxit.sewer", // RaidX coordination
  elShito: "elshito@datxit.sewer", // El Shito sightings
  reserveHole: "reservehole@datxit.sewer", // Burn proofs & flexing
}

export interface XMTPMessage {
  id: string
  senderAddress: string
  text: string
  timestamp: number
  isOwn: boolean
}

export interface XMTPGroup {
  name: string
  address: string
  memberCount?: number
  lastMessage?: string
}
