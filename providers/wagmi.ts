// BY GOD'S GRACE ALONE
import {http, createConfig} from 'wagmi'
import {arbitrumSepolia} from 'wagmi/chains'
import {getDefaultConfig} from '@rainbow-me/rainbowkit'

export const config = getDefaultConfig({
    appName: 'Stripe for Web3',
    projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
    chains: [arbitrumSepolia],
    transports: {
        [arbitrumSepolia.id]: http(`${process.env.NEXT_PUBLIC_ARBITRUM_SEPOLIA_RPC}`),
    },
    ssr: true
})