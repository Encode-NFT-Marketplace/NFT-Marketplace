import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";

import { cookieStorage, createStorage, http } from "wagmi";
import { celoAlfajores, mainnet, sepolia } from "wagmi/chains";
import { injected } from "@wagmi/connectors";

// Get projectId at https://cloud.walletconnect.com
export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

if (!projectId) throw new Error("Project ID is not defined");

const metadata = {
  name: "NFT-Marketplace",
  description: 'NFT-Marketplace',
  url: "https://NFT-Marketplace.vercel.app/", // origin must match your domain & subdomain
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

// Create wagmiConfig
const chains = [mainnet, sepolia, celoAlfajores] as const;
export const config = defaultWagmiConfig({
  chains,
  connectors: [injected()],
  transports: {
    [sepolia.id]: http(),
  },
  projectId,
  metadata,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
  //   ...wagmiOptions // Optional - Override createConfig parameters
});
