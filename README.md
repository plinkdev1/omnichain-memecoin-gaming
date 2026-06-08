# DatXit — An Omnichain Memecoin Ecosystem with On-Chain Micro-Betting Games

A community-token ecosystem built around $DATX: a Solana-native token, a private arcade of turn-based player-vs-player games with real on-chain stakes, and a satirical prediction market — all under one themed app.

> **Status:** MVP / mock-mode. The arcade and themed front-end are implemented; on-chain staking, NFT power-ups, and omnichain bridging are in progress.

## Overview

DatXit bundles three things into one product: the $DATX token, **Arena** (a wallet-gated club of six turn-based 2-player games that can be played for small on-chain stakes), and **Bets** (an integrated satirical prediction market). It is designed Solana-first and built to expand omnichain.

It is a typed Next.js application with a fully client-side game engine, a consistent themed visual system (per-page dynamic backgrounds), and an on-chain layer for staked matches kept behind a wallet/escrow boundary so casual play needs no backend.

## Core Features

- **$DATX token** — Solana SPL community token, designed to go omnichain via LayerZero + Hyperlane.
- **Arena** — six turn-based 2-player games (Tic-Tac-Toe, Checkers, Gomoku, Dots & Boxes, Halma, Nine Men's Morris) with optional stakes.
- **On-chain stakes** — wagered matches escrow $DATX on-chain and burn a share of losses (deflationary).
- **NFT power-ups** — collectible gear that grants in-game edge.
- **Bets** — an integrated satirical prediction market.
- **Public API** — open endpoints so the community can build bots.

## Architecture

| Layer | Technology |
|-------|------------|
| Frontend | Next.js, React, TypeScript, Tailwind CSS, shadcn/ui |
| Chain | Solana (SPL); LayerZero + Hyperlane (omnichain, roadmap) |
| Wallet | Phantom via Alchemy RPC |
| Game state | Client-side (localStorage for casual, on-chain tx for staked) |
| Storage | IPFS / nft.storage |

**Project layout.** A themed marketing site, a wallet-gated `/private` Arena hub with a swappable board engine shared across the six games, and a Bets prediction-market section. Staked matches and the prediction market settle through dedicated wallet/escrow flows.

## Screenshots

<p align="center">
  <img src="screenshots/01.png" width="800" /><br/><br/>
  <img src="screenshots/02.png" width="800" /><br/><br/>
  <img src="screenshots/03.png" width="800" /><br/><br/>
  <img src="screenshots/04.png" width="800" /><br/><br/>
</p>

## Getting Started

```bash
npm install --legacy-peer-deps --ignore-scripts
npx next dev
```

Environment variables (names only — never commit real values):
NEXT_PUBLIC_NFT_STORAGE_KEY=
NEXT_PUBLIC_TEAM_PASSWORD=
NEXT_PUBLIC_SOLANA_RPC_URL=

## Roadmap

- On-chain staking and burn on Solana mainnet
- NFT power-up minting and effects
- Omnichain $DATX via LayerZero + Hyperlane
- Public bot/API documentation

## Notes

Shared as a portfolio artifact demonstrating product and system design. Early prototype, not a finished product. All content is satirical and for entertainment only — not financial advice, and no real-money gambling.

