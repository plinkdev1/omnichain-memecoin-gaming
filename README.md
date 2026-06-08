# DatXit ($DATX)

![Solana](https://img.shields.io/badge/Solana-9945FF?logo=solana&logoColor=white)
![LayerZero](https://img.shields.io/badge/LayerZero-000000)
![Next.js](https://img.shields.io/badge/Next.js-000?logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Status](https://img.shields.io/badge/status-MVP-orange)

> **An omnichain community-token ecosystem** pairing a Solana-native memecoin ($DATX) with a P2P micro-betting arcade and a satirical prediction market — NFT power-ups, on-chain escrow, and an open API for bots.

DatXit is the umbrella product for **$DATX**. It bundles three things: the token, **Arena** (a private club of turn-based P2P games with real on-chain stakes), and **Bets** (the DXMarket prediction market).

## Features

| Module | Description |
|---|---|
| **$DATX token** | Solana SPL community token, going omnichain via LayerZero + Hyperlane. |
| **Arena** | Six turn-based 2-player games (Tic-Tac-Toe, Checkers, Gomoku, Dots & Boxes, Halma, Nine Men's Morris) with optional $DATX stakes. |
| **On-chain stakes** | Wagered games escrow $DATX on-chain; a share of losses is burned (deflationary). |
| **NFT power-ups** | Collectible gear that grants real in-game edge. |
| **Bets** | Integrated satirical prediction market (see DXMarket). |
| **Open API** | Public endpoints so the community can build arbitrage/automation bots. |
| **Wallet-gated club** | Private hub gated by team password / wallet. |

## Engineering highlights

- **Client-side game engine** — six fully turn-based games sharing a swappable board abstraction (pure React/JS, no realtime sync needed).
- **On-chain escrow + burn** — staked matches lock $DATX and settle on-chain, burning a portion on loss.
- **Omnichain design** — token bridging via LayerZero + Hyperlane.
- **NFT integration** — power-up NFTs affect game logic; metadata via nft.storage.
- **Immersive theming** — per-page dynamic backgrounds and a consistent neon visual system across the Next.js app.

## Tech stack

| Layer | Stack |
|---|---|
| Frontend | Next.js, React, TypeScript, Tailwind CSS, shadcn/ui |
| Chain | Solana (SPL), LayerZero + Hyperlane (omnichain) |
| Wallet | Phantom, Alchemy RPC |
| Game state | Client-side (localStorage for casual play, on-chain tx for staked) |
| Storage | nft.storage |

## Architecture
Next.js client
├── Arena (client-side game engine, 6 games)
├── Bets  (prediction market UI)
└── Wallet (Phantom)
│  staked matches / bets
▼
Solana programs (escrow · burn) + $DATX SPL
│
▼
LayerZero / Hyperlane  →  omnichain $DATX

## Status

Early MVP / mock-mode. Managed under the Treezures Labs umbrella.
