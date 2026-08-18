import type {
    PublicClient,
    WalletClient,
} from "viem";

import {
    MerchantClient,
} from "@stripe-for-web3/merchant";

import {
    appConfig,
} from "@/app/config";

////////////////////////////////////////////////////////////
// FACTORY
////////////////////////////////////////////////////////////

export function createMerchantClient({
    walletClient,
    publicClient,
}: {
    walletClient: WalletClient;

    publicClient: PublicClient;
}): MerchantClient {
    return new MerchantClient({
        walletClient,
        publicClient,
        contractAddress:
            appConfig.billingContractAddress,
        apiUrl:
            appConfig.apiUrl,
    });
}