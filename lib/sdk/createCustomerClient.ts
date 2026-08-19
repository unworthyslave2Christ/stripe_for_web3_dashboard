import type {
    PublicClient,
    WalletClient,
} from "viem";

import {
    CustomerClient,
} from "@stripe-for-web3/customer";

import {
    appConfig,
} from "@/app/config";

////////////////////////////////////////////////////////////
// FACTORY
////////////////////////////////////////////////////////////

export function createCustomerClient({
    walletClient,
    publicClient,
}: {
    walletClient:
        WalletClient;

    publicClient:
        PublicClient;
}): CustomerClient {
    return new CustomerClient({
        walletClient,

        publicClient,

        contractAddress:
            appConfig.billingContractAddress,

        apiUrl:
            appConfig.apiUrl,
    });
}