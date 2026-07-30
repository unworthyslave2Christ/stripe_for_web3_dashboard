
import {
    getContract,
    type Address,
    type WalletClient,
    type PublicClient,
} from "viem";

import protocolAbi from "@/abi/Web3BillingProtocol.json";

/* -------------------------------------------------------------------------- */
/* Supabase                                                                    */
/* -------------------------------------------------------------------------- */


/* -------------------------------------------------------------------------- */
/* Interfaces                                                                   */
/* -------------------------------------------------------------------------- */

interface RegisterMerchantParams {

    walletClient: WalletClient;

    publicClient: PublicClient;

    contractAddress: Address;

    merchantSmartAccount: Address;

    payoutWallet: Address;

    name: string;

    metadataURI?: string;

}



/* -------------------------------------------------------------------------- */
/* Register Merchant                                                           */
/* -------------------------------------------------------------------------- */

export async function registerMerchant({

    walletClient,

    publicClient,

    contractAddress,

    merchantSmartAccount,

    payoutWallet,

    name,

    metadataURI = "",

}: RegisterMerchantParams) {

    /*
    --------------------------------------------------------------------------
    Wallet Account
    --------------------------------------------------------------------------
    */

    const [account] =

        await walletClient.getAddresses();

    /*
    --------------------------------------------------------------------------
    Estimate Gas
    --------------------------------------------------------------------------
    */

    const gas =

        await publicClient.estimateContractGas({

            account,

            address: contractAddress,

            abi: protocolAbi,

            functionName: "registerMerchant",

            args: [

                merchantSmartAccount,

                payoutWallet,

                name,

                metadataURI,

            ],

        });

    /*
    --------------------------------------------------------------------------
    Submit Transaction
    --------------------------------------------------------------------------
    */

    const hash =

        await walletClient.writeContract({

            account,

            chain: walletClient.chain,

            address: contractAddress,

            abi: protocolAbi,

            functionName: "registerMerchant",

            args: [

                merchantSmartAccount,

                payoutWallet,

                name,

                metadataURI,

            ],

            gas,

        });

    /*
    --------------------------------------------------------------------------
    Wait For Confirmation
    --------------------------------------------------------------------------
    */

    const receipt =

        await publicClient.waitForTransactionReceipt({

            hash,

        });

    if (receipt.status !== "success") {

        throw new Error(

            "Merchant registration transaction failed.",

        );

    }

    /*
    --------------------------------------------------------------------------
    Retrieve MerchantCreated Event
    --------------------------------------------------------------------------
    */

    const events =

        await publicClient.getContractEvents({

            address: contractAddress,

            abi: protocolAbi,

            eventName: "MerchantCreated",

            fromBlock: receipt.blockNumber,

            toBlock: receipt.blockNumber,

        });

    if (events.length !== 1) {

        throw new Error(

            "MerchantCreated event not found.",

        );

    }

    const merchantId =

        (events[0] as any)

            .args

            .merchantId as bigint;

    
    const response = await fetch("/api/merchant", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            merchantId: Number(merchantId),
            smartAccount: merchantSmartAccount,
            payoutWallet,
            name,
            metadataURI,
        }),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error ?? "Unable to mirror merchant.");
    }


    /*
    --------------------------------------------------------------------------
    Return
    --------------------------------------------------------------------------
    */

    return {

        merchantId,

        hash,

        receipt,

    };

}

/* -------------------------------------------------------------------------- */
/* Merchant Exists                                                             */
/* -------------------------------------------------------------------------- */

interface ExistsParams {

    publicClient: PublicClient;

    contractAddress: Address;

    smartAccount: Address;

}

export async function merchantExists({

    publicClient,

    contractAddress,

    smartAccount,

}: ExistsParams): Promise<boolean> {

    return await publicClient.readContract({

        address: contractAddress,

        abi: protocolAbi,

        functionName: "merchantExists",

        args: [

            smartAccount,

        ],

    }) as boolean;

}

/* -------------------------------------------------------------------------- */
/* Merchant ID By Smart Account                                                */
/* -------------------------------------------------------------------------- */

interface MerchantLookupParams {

    publicClient: PublicClient;

    contractAddress: Address;

    smartAccount: Address;

}

export async function getMerchantIdBySmartAccount({

    publicClient,

    contractAddress,

    smartAccount,

}: MerchantLookupParams): Promise<bigint> {

    return await publicClient.readContract({

        address: contractAddress,

        abi: protocolAbi,

        functionName: "merchantBySmartAccount",

        args: [

            smartAccount,

        ],

    }) as bigint;

}

/* -------------------------------------------------------------------------- */
/* Get Merchant                                                                */
/* -------------------------------------------------------------------------- */

interface GetMerchantParams {

    publicClient: PublicClient;

    contractAddress: Address;

    merchantId: bigint;

}

export async function getMerchant({

    publicClient,

    contractAddress,

    merchantId,

}: GetMerchantParams) {

    const protocol =

        getContract({

            address: contractAddress,

            abi: protocolAbi,

            client: {

                public: publicClient,

            },

        });

    return await protocol.read.getMerchant([

        merchantId,

    ]);

}


export async function getMerchantById(
    merchantId: bigint,
) {
    const response = await fetch(
        `/api/merchant?merchantId=${Number(merchantId)}`,
        {
            cache: "no-store",
        },
    );

    const json = await response.json();

    if (!response.ok) {
        throw new Error(
            json.error ?? "Unable to load merchant.",
        );
    }

    return json;
}