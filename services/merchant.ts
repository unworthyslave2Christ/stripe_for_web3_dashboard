import {
    getContract,
    type Address,
    type WalletClient,
    type PublicClient,
} from "viem";

import protocolAbi from "@/abi/Web3BillingProtocol.json";

interface RegisterMerchantParams {
    walletClient: WalletClient;
    publicClient: PublicClient;

    contractAddress: Address;

    merchantSmartAccount: Address;

    payoutWallet: Address;

    name: string;

    metadataURI?: string;
}

export async function registerMerchant({
    walletClient,
    publicClient,
    contractAddress,
    merchantSmartAccount,
    payoutWallet,
    name,
    metadataURI = "",
}: RegisterMerchantParams) {
    const [account] =
        await walletClient.getAddresses();

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

    const receipt =
        await publicClient.waitForTransactionReceipt({
            hash,
        });

    const events =
        await publicClient.getContractEvents({
            address: contractAddress,
            abi: protocolAbi,
            eventName: "MerchantCreated",
            fromBlock: receipt.blockNumber,
            toBlock: receipt.blockNumber,
        });

    if (events.length !== 1)
        throw new Error("MerchantCreated event not found.");

    const merchantId =
        (events[0] as any).args.merchantId as bigint;

    return {
        merchantId,
        hash,
        receipt,
    };
}

interface ExistsParams {
    publicClient: PublicClient;
    contractAddress: Address;
    smartAccount: Address;
}

export async function merchantExists({
    publicClient,
    contractAddress,
    smartAccount,
}: ExistsParams) {
    return publicClient.readContract({
        address: contractAddress,
        abi: protocolAbi,
        functionName: "merchantExists",
        args: [smartAccount],
    }) as Promise<boolean>;
}

interface MerchantLookupParams {
    publicClient: PublicClient;
    contractAddress: Address;
    smartAccount: Address;
}

export async function getMerchantIdBySmartAccount({
    publicClient,
    contractAddress,
    smartAccount,
}: MerchantLookupParams) {
    return publicClient.readContract({
        address: contractAddress,
        abi: protocolAbi,
        functionName: "merchantBySmartAccount",
        args: [smartAccount],
    }) as Promise<bigint>;
}

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
    const protocol = getContract({
        address: contractAddress,
        abi: protocolAbi,
        client: {
            public: publicClient,
        },
    });

    return protocol.read.getMerchant([
        merchantId,
    ]);
}