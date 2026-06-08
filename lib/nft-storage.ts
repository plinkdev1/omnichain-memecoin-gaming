import { NFTStorage, File } from "nft.storage"

const NFT_STORAGE_KEY =
  process.env.NFT_STORAGE_API_KEY ||
  (process.env.NEXT_PUBLIC_NFT_STORAGE_KEY ?? "")

export async function uploadToIPFS(file: File): Promise<{ ipfsHash: string; ipfsUrl: string }> {
  const client = new NFTStorage({ token: NFT_STORAGE_KEY })
  const cid = await client.storeBlob(file)
  return {
    ipfsHash: cid,
    ipfsUrl: `https://nftstorage.link/ipfs/${cid}`,
  }
}

export async function uploadMetadataToIPFS(metadata: {
  title: string
  description: string
  image: string
  category: string
  wallet: string
}): Promise<{ ipfsHash: string; ipfsUrl: string }> {
  const client = new NFTStorage({ token: NFT_STORAGE_KEY })
  const metadataJson = JSON.stringify(metadata, null, 2)
  const metadataFile = new File([metadataJson], "metadata.json", { type: "application/json" })
  const cid = await client.storeBlob(metadataFile)
  return {
    ipfsHash: cid,
    ipfsUrl: `https://nftstorage.link/ipfs/${cid}`,
  }
}
