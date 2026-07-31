// services/dashboard.ts

import {
    getContract,
    type Address,
    type PublicClient,
} from "viem";

import protocolAbi from "@/abi/Web3BillingProtocol.json";

import type {
    DashboardData,
    Merchant,
} from "@/types/dashboard";

/* -------------------------------------------------------------------------- */
/* Contract Context                                                            */
/* -------------------------------------------------------------------------- */

export interface DashboardContext {

    publicClient: PublicClient;

    contractAddress: Address;

}

/* -------------------------------------------------------------------------- */
/* Merchant Exists (On-chain)                                                  */
/* -------------------------------------------------------------------------- */

export async function merchantExists(

    context: DashboardContext,

    smartAccount: Address,

): Promise<boolean> {

    const protocol = getContract({

        address: context.contractAddress,

        abi: protocolAbi,

        client: {

            public: context.publicClient,

        },

    });

    

    const exists = await protocol.read.merchantExists([

        smartAccount,

    ]);

    console.log("smarAccount exists? ", smartAccount);
    console.log(exists);

    return Boolean(exists);

}

/* -------------------------------------------------------------------------- */
/* Merchant Lookup (API)                                                       */
/* -------------------------------------------------------------------------- */

export async function getMerchantBySmartAccount(

    smartAccount: Address,

): Promise<Merchant> {

    const response = await fetch(

        `/api/merchant?smartAccount=${smartAccount}`,

        {

            method: "GET",

            cache: "no-store",

        },

    );

    const json = await response.json();

    if (!response.ok) {

        throw new Error(

            json.error ??

            "Unable to retrieve merchant.",

        );

    }

    return {

        merchantId:
            Number(json.merchant_id),

        smartAccount:
            json.smart_account as Address,

        payoutWallet:
            json.payout_wallet as Address,

        name:
            json.name,

        ownerWallet: 
            json.owner_wallet as Address,

        metadataURI:
            json.metadata_uri ?? "",

        status:
            json.status,

        createdAt:
            json.created_at,

        updatedAt:
            json.updated_at,

    };

}
/* -------------------------------------------------------------------------- */
/* Dashboard (API)                                                             */
/* -------------------------------------------------------------------------- */

export async function getDashboard(

    _context: DashboardContext,

    merchantId: number,

): Promise<DashboardData> {

    const response = await fetch(

        `/api/dashboard?merchantId=${merchantId}`,

        {

            method: "GET",

            cache: "no-store",

        },

    );

    const json = await response.json();

    if (!response.ok) {

        throw new Error(

            json.error ??

            "Unable to load dashboard.",

        );

    }

    return json as DashboardData;

}